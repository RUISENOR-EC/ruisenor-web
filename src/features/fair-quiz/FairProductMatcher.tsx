import { ArrowLeft, ArrowUpRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import { products } from '../catalog/data/products'
import { useAnalytics } from '../analytics/hooks'
import {
  fairInterestOptions,
  fairMomentOptions,
  getFairRecommendation,
  getPreferenceOptions,
  type FairInterest,
  type FairMoment,
  type FairPreference,
  type FairQuizAnswers,
  type FairQuizOption,
} from './recommendation'
import { WhatsAppButton } from '../contact/WhatsAppButton'

type QuizStep = 0 | 1 | 2 | 3

type QuizQuestionProps<T extends string> = {
  prompt: string
  helpText: string
  name: string
  options: FairQuizOption<T>[]
  value?: T
  onChange: (value: T) => void
}

function QuizQuestion<T extends string>({ prompt, helpText, name, options, value, onChange }: QuizQuestionProps<T>) {
  return (
    <fieldset>
      <legend className="font-serif-brand text-3xl font-semibold leading-tight text-marfil sm:text-4xl">{prompt}</legend>
      <p className="mt-3 max-w-xl text-sm leading-6 text-marfil/60">{helpText}</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.value

          return (
            <label key={option.value} className="group cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
              />
              <span className="flex min-h-28 flex-col justify-between border border-marfil/20 bg-marfil/5 p-5 transition duration-200 hover:border-dorado hover:bg-marfil/10 peer-checked:border-dorado peer-checked:bg-dorado peer-checked:text-espresso peer-focus-visible:outline-3 peer-focus-visible:outline-dorado peer-focus-visible:outline-offset-4">
                <span className="flex items-start justify-between gap-4">
                  <strong className="font-serif-brand text-2xl font-semibold leading-none">{option.label}</strong>
                  <span className={`grid size-6 shrink-0 place-items-center border ${isSelected ? 'border-espresso bg-espresso text-dorado' : 'border-marfil/35 text-transparent'}`} aria-hidden="true"><Check size={14} /></span>
                </span>
                <span className="mt-3 block text-xs leading-5 opacity-65">{option.description}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function QuizProgress({ step }: { step: QuizStep }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Progreso del perfil de producto">
      {['Interés', 'Formato', 'Ocasión'].map((label, index) => {
        const currentStep = index as Exclude<QuizStep, 3>
        const isCurrent = step === currentStep
        const isCompleted = step > currentStep

        return (
          <li key={label} className="min-w-0">
            <div className={`h-1 ${isCompleted || isCurrent ? 'bg-dorado' : 'bg-marfil/20'}`} aria-hidden="true" />
            <p className={`mt-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] ${isCurrent ? 'text-dorado' : 'text-marfil/45'}`} aria-current={isCurrent ? 'step' : undefined}>
              0{index + 1} · {label}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

export function FairProductMatcher() {
  const { track } = useAnalytics()
  const [step, setStep] = useState<QuizStep>(0)
  const [answers, setAnswers] = useState<FairQuizAnswers>({})
  const hasStarted = useRef(false)
  const recommendation = getFairRecommendation(answers)
  const recommendedProduct = recommendation ? products.find((product) => product.id === recommendation.productId) : undefined

  function trackAnswer(question: string, answer: string) {
    void track({ eventName: 'fair_quiz_answered', target: question, metadata: { answer } })
  }

  function selectInterest(interest: FairInterest) {
    if (!hasStarted.current) {
      hasStarted.current = true
      void track({ eventName: 'fair_quiz_started', target: 'fair-product-matcher' })
    }

    setAnswers({ interest })
    trackAnswer('interest', interest)
    setStep(1)
  }

  function selectPreference(preference: FairPreference) {
    setAnswers((current) => ({ ...current, preference }))
    trackAnswer('preference', preference)
    setStep(2)
  }

  function selectMoment(moment: FairMoment) {
    const nextAnswers = { ...answers, moment }
    const nextRecommendation = getFairRecommendation(nextAnswers)

    setAnswers(nextAnswers)
    trackAnswer('moment', moment)
    setStep(3)

    if (nextRecommendation) {
      const product = products.find((item) => item.id === nextRecommendation.productId)
      const metadata = {
        interest: nextAnswers.interest ?? null,
        preference: nextAnswers.preference ?? null,
        moment,
        productName: product?.name ?? nextRecommendation.productId,
      }

      void track({ eventName: 'fair_quiz_completed', target: nextRecommendation.productId, metadata })
      void track({ eventName: 'fair_recommendation_view', target: nextRecommendation.productId, metadata })
    }
  }

  function goBack() {
    if (step === 0) return
    setStep((current) => (current === 3 ? 2 : (current - 1) as QuizStep))
  }

  function restart() {
    setAnswers({})
    setStep(0)
  }

  const question = step === 0
    ? <QuizQuestion prompt="¿Qué te gustaría descubrir hoy?" helpText="Elige una línea y prepararemos una recomendación con los productos que ya están en el catálogo." name="fair-interest" options={fairInterestOptions} value={answers.interest} onChange={selectInterest} />
    : step === 1 && answers.interest
      ? <QuizQuestion prompt={answers.interest === 'chocolate' ? '¿Qué tipo de presentación buscas?' : '¿Cómo prefieres preparar tu café?'} helpText="No necesitas saber nombres técnicos; cuéntanos cómo te gustaría disfrutarlo." name="fair-preference" options={getPreferenceOptions(answers.interest)} value={answers.preference} onChange={selectPreference} />
      : step === 2
        ? <QuizQuestion prompt="¿Para qué ocasión lo estás buscando?" helpText="Esto nos ayuda a recomendar una presentación con un mensaje más útil para tu consulta." name="fair-moment" options={fairMomentOptions} value={answers.moment} onChange={selectMoment} />
        : null

  return (
    <section id="perfil" className="mt-14 scroll-mt-28 border border-espresso bg-espresso p-5 text-marfil shadow-2xl shadow-espresso/20 sm:p-8 lg:p-10" aria-labelledby="perfil-title">
      <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12">
        <div className="flex flex-col justify-between border-b border-marfil/15 pb-7 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <div>
            <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-dorado"><Sparkles size={15} aria-hidden="true" /> Experiencia de feria</p>
            <h2 id="perfil-title" className="mt-5 max-w-sm font-serif-brand text-5xl font-semibold leading-[0.9] sm:text-6xl">Encuentra qué probar en tres respuestas.</h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-marfil/60">No es un test genérico: la salida siempre usa una presentación real de Ruiseñor y deja lista tu consulta.</p>
          </div>
          <div className="mt-8 border-l border-dorado pl-4 text-xs leading-5 text-marfil/60"><strong className="block text-[0.58rem] uppercase tracking-[0.16em] text-dorado">Tiempo estimado</strong><span className="mt-1 block">Menos de un minuto, sin registro ni datos personales.</span></div>
        </div>

        <div>
          {step < 3 ? (
            <>
              <QuizProgress step={step} />
              <div className="mt-9" aria-live="polite">{question}</div>
              {step > 0 && <button type="button" onClick={goBack} className="mt-7 inline-flex min-h-12 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-marfil/60 transition hover:text-dorado"><ArrowLeft size={15} aria-hidden="true" /> Cambiar respuesta anterior</button>}
            </>
          ) : recommendation && recommendedProduct ? (
            <div aria-live="polite">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-dorado">{recommendation.eyebrow}</p>
              <div className="mt-5 grid gap-6 border border-marfil/15 bg-marfil/5 p-4 sm:grid-cols-[0.75fr_1fr] sm:p-5">
                <div className="relative min-h-52 overflow-hidden bg-cacao"><img src={recommendedProduct.image} alt={recommendedProduct.name} width={recommendedProduct.width} height={recommendedProduct.height} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div>
                <div className="flex flex-col items-start justify-between">
                  <div><p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-dorado">{recommendedProduct.category}</p><h3 className="mt-3 font-serif-brand text-4xl font-semibold leading-none">{recommendedProduct.name}</h3><p className="mt-4 text-sm leading-6 text-marfil/65">{recommendation.explanation}</p></div>
                  <WhatsAppButton label="Consultar esta recomendación" message={`Hola, escaneé el QR de la feria. Me recomendaron ${recommendedProduct.name} y quisiera conocer formato y disponibilidad.`} metadata={{ entryPoint: 'fair_recommendation', productId: recommendedProduct.id, productName: recommendedProduct.name }} className="mt-7 w-full justify-between sm:w-auto" />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="text-xs leading-5 text-marfil/50">También puedes ver toda la selección en el catálogo.</p><div className="flex flex-wrap gap-4"><a href="#catalogo" className="inline-flex min-h-12 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-dorado hover:text-marfil">Ver catálogo <ArrowUpRight size={15} aria-hidden="true" /></a><button type="button" onClick={restart} className="inline-flex min-h-12 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-marfil/60 hover:text-dorado"><RotateCcw size={15} aria-hidden="true" /> Empezar de nuevo</button></div></div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'motion/react'
import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { useAnalytics, useTrackSection } from '../../features/analytics/hooks'
import { fairData, getFairQrUrl } from '../../features/qr/data/fair'
import { QrExperience } from '../../features/qr/QrExperience'
import { FairProductMatcher } from '../../features/fair-quiz/FairProductMatcher'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'
import { useTilt } from '../ui/useTilt'

export function FairSection() {
  const { campaign } = useAnalytics()
  useTrackSection('feria', 'promotion_view')
  const { ref: ticketRef, style: ticketTiltStyle } = useTilt<HTMLDivElement>({ max: 7 })

  const content = campaign ?? fairData
  const qrValue = getFairQrUrl()

  return (
    <section id="feria" className="bg-dorado px-5 py-20 text-espresso lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <SectionKicker>Experiencia presencial</SectionKicker>
          <h2 className="mt-6 max-w-3xl font-serif-brand text-5xl font-semibold leading-[0.9] sm:text-7xl">
            Una visita a la feria puede terminar en tu producto ideal.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-espresso">
            <span className="font-semibold text-espresso">{content.name}</span> conecta el stand con una recomendación breve, para que cada visitante pueda avanzar hacia el producto que quiere consultar.
          </p>

          <div className="mt-8 grid max-w-xl gap-4 border-t border-espresso/20 pt-5 sm:grid-cols-3">
            <div className="flex gap-3">
              <CalendarDays size={18} aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-espresso/85">Fecha</p>
                <p className="mt-1 text-sm font-semibold">{content.date}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin size={18} aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-espresso/85">Lugar</p>
                <p className="mt-1 text-sm font-semibold">{content.location}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Ticket size={18} aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-espresso/85">Stand</p>
                <p className="mt-1 text-sm font-semibold">{content.stand}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 max-w-xl border-l-2 border-espresso/40 pl-4 text-sm leading-6 text-espresso">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-espresso/85">Promoción en el QR</p>
            <p className="mt-1 font-semibold text-espresso">{content.promotion}</p>
          </div>
        </Reveal>

        <Reveal className="mx-auto w-full max-w-xs rotate-1">
          <motion.div
            ref={ticketRef}
            style={ticketTiltStyle}
            className="tilt relative overflow-hidden border-2 border-espresso bg-marfil p-5 shadow-2xl shadow-espresso/20 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:-translate-x-[130%] before:bg-gradient-to-tr before:from-transparent before:via-dorado/60 before:to-transparent before:transition-transform before:duration-700 before:ease-out before:content-[''] hover:before:translate-x-[130%]"
          >
            <div className="flex items-start justify-between border-b border-dashed border-espresso/25 pb-4">
              <div>
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-espresso/85">Pase de feria</p>
                <p className="mt-2 font-serif-brand text-3xl font-semibold">R / 01</p>
              </div>
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em] text-rojo-marca">QR</span>
            </div>
            <div className="py-6">
              <QrExperience value={qrValue} />
            </div>
            <p className="border-t border-dashed border-espresso/25 pt-4 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-espresso/85">
              Catálogo · redes · contacto · feria
            </p>
          </motion.div>
        </Reveal>
      </div>
      <div className="mx-auto max-w-[1440px]">
        <FairProductMatcher />
      </div>
    </section>
  )
}

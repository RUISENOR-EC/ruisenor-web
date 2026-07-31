export type FairInterest = 'chocolate' | 'cafe'
export type FairPreference = 'intenso' | 'regalo' | 'molido' | 'grano'
export type FairMoment = 'para-mi' | 'regalo' | 'compartir'

export type FairQuizAnswers = {
  interest?: FairInterest
  preference?: FairPreference
  moment?: FairMoment
}

export type FairQuizOption<T extends string> = {
  value: T
  label: string
  description: string
}

export type FairRecommendation = {
  productId: string
  eyebrow: string
  explanation: string
}

export const fairInterestOptions: FairQuizOption<FairInterest>[] = [
  {
    value: 'chocolate',
    label: 'Chocolate',
    description: 'Quiero descubrir una presentación de cacao.',
  },
  {
    value: 'cafe',
    label: 'Café',
    description: 'Quiero conocer una opción para preparar.',
  },
]

const chocolatePreferenceOptions: FairQuizOption<Extract<FairPreference, 'intenso' | 'regalo'>>[] = [
  {
    value: 'intenso',
    label: 'Pasta de cacao intensa',
    description: 'Busco una opción de cacao puro para mi momento.',
  },
  {
    value: 'regalo',
    label: 'Una presentación para regalar',
    description: 'Quiero compartir un detalle especial.',
  },
]

const coffeePreferenceOptions: FairQuizOption<Extract<FairPreference, 'molido' | 'grano'>>[] = [
  {
    value: 'molido',
    label: 'Café molido',
    description: 'Prefiero tenerlo listo para preparar.',
  },
  {
    value: 'grano',
    label: 'Café en grano',
    description: 'Quiero molerlo antes de prepararlo.',
  },
]

export const fairMomentOptions: FairQuizOption<FairMoment>[] = [
  {
    value: 'para-mi',
    label: 'Para mí',
    description: 'Quiero disfrutarlo en mi propio momento.',
  },
  {
    value: 'regalo',
    label: 'Para regalar',
    description: 'Estoy buscando un detalle para alguien especial.',
  },
  {
    value: 'compartir',
    label: 'Para compartir',
    description: 'Quiero llevar algo para disfrutar acompañado.',
  },
]

export function getPreferenceOptions(interest: FairInterest) {
  return interest === 'chocolate' ? chocolatePreferenceOptions : coffeePreferenceOptions
}

export function getFairRecommendation(answers: FairQuizAnswers): FairRecommendation | null {
  if (!answers.interest || !answers.preference || !answers.moment) return null

  const invalidCombination = (answers.interest === 'chocolate' && !['intenso', 'regalo'].includes(answers.preference))
    || (answers.interest === 'cafe' && !['molido', 'grano'].includes(answers.preference))
  if (invalidCombination) return null

  const productId = answers.interest === 'chocolate'
    ? answers.preference === 'intenso' ? 'pasta-cacao' : 'bombones-artesanales'
    : answers.preference === 'molido' ? 'cafe-molido' : 'cafe-tostado'

  const momentDescription = {
    'para-mi': 'para acompañar tu propio momento',
    regalo: 'como un detalle para regalar',
    compartir: 'para llevar y compartir',
  }[answers.moment]

  return {
    productId,
    eyebrow: 'Tu selección Ruiseñor',
    explanation: `Por lo que elegiste, esta presentación encaja ${momentDescription}. Consulta formato y disponibilidad directamente con la marca.`,
  }
}

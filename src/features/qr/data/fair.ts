export type FairCampaignContent = {
  slug: string
  name: string
  date: string
  location: string
  stand: string
  promotion: string
}

export const fairData: FairCampaignContent = {
  slug: 'feria-cangrejo-2026',
  name: 'Feria del Cangrejo',
  date: 'Fecha por confirmar',
  location: 'Ubicación por confirmar',
  stand: 'Stand por confirmar',
  promotion: 'Promoción por confirmar',
}

export function getFairQrUrl() {
  if (typeof window === 'undefined') return `/?campaign=${fairData.slug}&utm_source=qr&utm_medium=offline#perfil`

  const url = new URL(window.location.href)
  url.searchParams.set('campaign', fairData.slug)
  url.searchParams.set('utm_source', 'qr')
  url.searchParams.set('utm_medium', 'offline')
  url.searchParams.set('utm_campaign', fairData.slug)
  url.hash = 'perfil'

  return url.toString()
}

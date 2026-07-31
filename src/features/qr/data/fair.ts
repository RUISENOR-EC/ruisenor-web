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

function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.trim()
  if (configuredUrl) return configuredUrl

  if (typeof window !== 'undefined') return window.location.origin

  return 'http://localhost'
}

export function getFairQrUrl(siteUrl = getSiteUrl()) {
  const url = new URL('/', siteUrl)

  url.searchParams.set('campaign', fairData.slug)
  url.searchParams.set('utm_source', 'qr')
  url.searchParams.set('utm_medium', 'offline')
  url.searchParams.set('utm_campaign', fairData.slug)
  url.hash = 'perfil'

  return url.toString()
}

export function isLocalFairQrUrl(qrUrl: string) {
  try {
    const { hostname } = new URL(qrUrl)
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
  } catch {
    return true
  }
}

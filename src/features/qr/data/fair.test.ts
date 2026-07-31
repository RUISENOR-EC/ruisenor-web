import { describe, expect, it } from 'vitest'
import { getFairQrUrl, isLocalFairQrUrl } from './fair'

describe('getFairQrUrl', () => {
  it('siempre dirige a la página pública aunque se genere desde el panel', () => {
    expect(getFairQrUrl('https://ruisenor.netlify.app/admin/analytics')).toBe(
      'https://ruisenor.netlify.app/?campaign=feria-cangrejo-2026&utm_source=qr&utm_medium=offline&utm_campaign=feria-cangrejo-2026#perfil',
    )
  })

  it('identifica una URL local que no se debe imprimir', () => {
    expect(isLocalFairQrUrl('http://127.0.0.1:5173/?campaign=feria-cangrejo-2026')).toBe(true)
    expect(isLocalFairQrUrl('https://ruisenor.netlify.app/?campaign=feria-cangrejo-2026')).toBe(false)
  })
})

import { describe, expect, it } from 'vitest'
import { getFairRecommendation } from './recommendation'

describe('getFairRecommendation', () => {
  it.each([
    [{ interest: 'chocolate', preference: 'intenso', moment: 'para-mi' }, 'tableta-cacao'],
    [{ interest: 'chocolate', preference: 'regalo', moment: 'regalo' }, 'chocolate-artesanal'],
    [{ interest: 'cafe', preference: 'molido', moment: 'compartir' }, 'cafe-molido'],
    [{ interest: 'cafe', preference: 'grano', moment: 'para-mi' }, 'cafe-tostado'],
  ] as const)('recomienda %s según las respuestas', (answers, productId) => {
    expect(getFairRecommendation(answers)?.productId).toBe(productId)
  })

  it('no recomienda un producto si falta una respuesta', () => {
    expect(getFairRecommendation({ interest: 'chocolate', preference: 'intenso' })).toBeNull()
  })

  it('descarta combinaciones que no aparecen en la experiencia', () => {
    expect(getFairRecommendation({ interest: 'cafe', preference: 'intenso', moment: 'para-mi' })).toBeNull()
  })
})

import cafeMolido from '../../../assets/brand/cafe-molido.png'
import cafeTostado from '../../../assets/brand/cafe-tostado.png'
import chocolateBox from '../../../assets/brand/chocolate-box.png'
import chocolateTablet from '../../../assets/brand/chocolate-tablet.png'

export type Product = {
  id: string
  name: string
  category: 'Chocolate' | 'Café'
  detail: string
  image: string
  width: number
  height: number
}

export const products: Product[] = [
  {
    id: 'chocolate-artesanal',
    name: 'Chocolate artesanal',
    category: 'Chocolate',
    detail: 'Presentación de caja · consultar disponibilidad',
    image: chocolateBox,
    width: 1376,
    height: 768,
  },
  {
    id: 'tableta-cacao',
    name: 'Tableta de cacao',
    category: 'Chocolate',
    detail: 'Tableta empacada · consultar formato',
    image: chocolateTablet,
    width: 768,
    height: 1376,
  },
  {
    id: 'cafe-molido',
    name: 'Café molido',
    category: 'Café',
    detail: 'Presentación de 200 g · consultar disponibilidad',
    image: cafeMolido,
    width: 896,
    height: 1195,
  },
  {
    id: 'cafe-tostado',
    name: 'Café tostado',
    category: 'Café',
    detail: 'Grano tostado · consultar formato',
    image: cafeTostado,
    width: 1376,
    height: 768,
  },
]

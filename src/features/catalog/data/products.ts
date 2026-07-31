import cafeMolido from '../../../assets/brand/cafe-molido.png'
import cafeTostado from '../../../assets/brand/cafe-tostado.png'
import bombonesArtesanales from '../../../assets/brand/bombones-artesanales.jpg'
import chocolateBox from '../../../assets/brand/chocolate-box.png'
import chocolateTablet from '../../../assets/brand/chocolate-tablet.png'
import filtroCafe from '../../../assets/brand/filtro-cafe.jpg'

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
    detail: 'Chocolate con leche al 50% de cacao',
    image: chocolateBox,
    width: 1376,
    height: 768,
  },
  {
    id: 'pasta-cacao',
    name: 'Pasta de cacao',
    category: 'Chocolate',
    detail: 'Cacao al 100%',
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
  {
    id: 'filtro-cafe',
    name: 'Filtro pequeño para café',
    category: 'Café',
    detail: 'Filtro para preparar café',
    image: filtroCafe,
    width: 896,
    height: 1195,
  },
  {
    id: 'bombones-artesanales',
    name: 'Bombones artesanales',
    category: 'Chocolate',
    detail: 'Caja de bombones artesanales · 125 g',
    image: bombonesArtesanales,
    width: 1200,
    height: 1600,
  },
]

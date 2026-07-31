import { useState } from 'react'
import { products } from '../../features/catalog/data/products'
import { ProductCard } from '../../features/catalog/components/ProductCard'
import { useTrackSection } from '../../features/analytics/hooks'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

const CATEGORY_FILTERS = ['Todos', 'Chocolate', 'Café'] as const
type CategoryFilter = (typeof CATEGORY_FILTERS)[number]

export function CatalogSection() {
  useTrackSection('catalogo', 'catalog_view')
  const [filter, setFilter] = useState<CategoryFilter>('Todos')

  const filteredProducts = filter === 'Todos' ? products : products.filter((product) => product.category === filter)

  return (
    <section id="catalogo" className="bg-crema px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionKicker>Catálogo</SectionKicker>
          <div className="mt-5 flex flex-col justify-between gap-5 border-b border-cacao/20 pb-8 md:flex-row md:items-end">
            <h2 className="font-serif-brand text-5xl font-semibold leading-none text-cacao sm:text-7xl">Productos reales.<br /><span className="text-rojo-marca">Información clara.</span></h2>
            <p className="max-w-sm text-sm leading-6 text-ink/70">Las fotos corresponden a los productos reales de Ruiseñor. Consulta disponibilidad directamente con la marca.</p>
          </div>
        </Reveal>
        <div className="mt-9 flex flex-wrap gap-2.5">
          {CATEGORY_FILTERS.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`min-h-12 border px-[1.1rem] py-[0.55rem] text-[0.68rem] font-bold uppercase tracking-[0.1em] transition ${
                filter === category
                  ? 'border-cacao bg-cacao text-crema'
                  : 'border-cacao/20 bg-transparent text-ink hover:border-cacao/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <Reveal key={product.id} transition={{ duration: 0.5, delay: index * 0.06 }}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

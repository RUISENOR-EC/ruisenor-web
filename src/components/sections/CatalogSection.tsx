import { products } from '../../features/catalog/data/products'
import { ProductCard } from '../../features/catalog/components/ProductCard'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

export function CatalogSection() {
  return (
    <section id="catalogo" className="bg-crema px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionKicker>Catálogo</SectionKicker>
          <div className="mt-5 flex flex-col justify-between gap-5 border-b border-cacao/20 pb-8 md:flex-row md:items-end">
            <h2 className="font-serif-brand text-5xl font-semibold leading-none text-cacao sm:text-7xl">Productos reales.<br /><span className="text-rojo-marca">Información clara.</span></h2>
            <p className="max-w-sm text-sm leading-6 text-ink/60">Las fotos corresponden a los productos recibidos. Precios y disponibilidad se completarán con el negocio.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} transition={{ duration: 0.5, delay: index * 0.06 }}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

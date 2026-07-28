import { ArrowUpRight } from 'lucide-react'
import type { Product } from '../data/products'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group border border-cacao/20 bg-marfil transition hover:-translate-y-1 hover:border-dorado hover:shadow-xl hover:shadow-cacao/10">
      <div className="relative aspect-[1.12] overflow-hidden bg-cacao">
        <img
          src={product.image}
          alt={`${product.name} de Ruiseñor`}
          width={product.width}
          height={product.height}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-espresso px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.15em] text-dorado">{product.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif-brand text-2xl font-semibold text-cacao">{product.name}</h3>
            <p className="mt-2 text-sm leading-5 text-ink/60">{product.detail}</p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center border border-cacao/20 text-cacao transition group-hover:border-dorado group-hover:bg-dorado"><ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
        <a href="#contacto" className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-rojo-marca hover:text-cacao">Consultar producto</a>
      </div>
    </article>
  )
}

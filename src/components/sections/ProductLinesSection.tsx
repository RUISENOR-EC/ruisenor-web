import { ArrowUpRight, Coffee, Gift } from 'lucide-react'
import cafeTostado from '../../assets/brand/cafe-tostado.png'
import chocolateTablet from '../../assets/brand/chocolate-tablet.png'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

export function ProductLinesSection() {
  return (
    <section id="lineas" className="bg-marfil px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionKicker>Dos líneas, una marca</SectionKicker>
          <div className="mt-5 flex flex-col justify-between gap-5 border-b border-cacao/20 pb-8 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-serif-brand text-5xl font-semibold leading-[0.9] text-cacao sm:text-7xl">Elige tu forma de disfrutar Ruiseñor.</h2>
            <p className="max-w-xs text-sm leading-6 text-ink/60">El catálogo se organizará por líneas para que el cliente encuentre el producto sin perderse.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal className="group relative min-h-[380px] overflow-hidden bg-cacao text-marfil">
            <img src={chocolateTablet} alt="Tableta de chocolate Ruiseñor" width={768} height={1376} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" aria-hidden="true" />
            <div className="relative flex min-h-[380px] flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-between"><span className="grid size-11 place-items-center border border-dorado text-dorado"><Gift size={18} aria-hidden="true" /></span><span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-dorado">Línea 01</span></div>
              <div><h3 className="font-serif-brand text-5xl font-semibold">Chocolate</h3><p className="mt-3 max-w-sm text-sm leading-6 text-marfil/70">Tabletas, cajas y presentaciones para regalar o disfrutar en casa.</p><a href="#catalogo" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-dorado">Ver chocolate <ArrowUpRight size={15} aria-hidden="true" /></a></div>
            </div>
          </Reveal>

          <Reveal className="group relative min-h-[380px] overflow-hidden bg-cacao text-marfil">
            <img src={cafeTostado} alt="Café tostado Ruiseñor" width={1376} height={768} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" aria-hidden="true" />
            <div className="relative flex min-h-[380px] flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-between"><span className="grid size-11 place-items-center border border-dorado text-dorado"><Coffee size={18} aria-hidden="true" /></span><span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-dorado">Línea 02</span></div>
              <div><h3 className="font-serif-brand text-5xl font-semibold">Café</h3><p className="mt-3 max-w-sm text-sm leading-6 text-marfil/70">Café molido y tostado para acompañar la pausa con el mismo sello.</p><a href="#catalogo" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-dorado">Ver café <ArrowUpRight size={15} aria-hidden="true" /></a></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

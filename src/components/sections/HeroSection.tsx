import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import chocolateSplash from '../../assets/brand/chocolate-splash.jpg'
import { BrandLogo } from '../ui/BrandLogo'
import { SectionKicker } from '../ui/SectionKicker'
import { Reveal } from '../ui/Reveal'
import { WhatsAppButton } from '../../features/contact/WhatsAppButton'

export function HeroSection() {
  return (
    <section id="inicio" className="bg-espresso text-marfil">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:py-24">
          <Reveal>
            <SectionKicker light>Marca de origen</SectionKicker>
            <BrandLogo size="md" className="mt-8" />
            <h1 className="mt-8 max-w-xl font-serif-brand text-5xl font-semibold leading-[0.92] tracking-[-0.03em] text-marfil sm:text-7xl">Chocolate y café con identidad.</h1>
            <p className="mt-7 max-w-md text-base leading-7 text-marfil/65 sm:text-lg">Productos para regalar, compartir y disfrutar. Conoce las líneas actuales de Ruiseñor.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#catalogo" className="inline-flex min-h-12 items-center gap-3 bg-dorado px-5 py-3 text-sm font-bold text-espresso transition hover:bg-marfil"><span>Ver catálogo</span><ArrowDownRight size={17} aria-hidden="true" /></a>
              <WhatsAppButton label="Consultar" className="bg-transparent ring-1 ring-dorado hover:bg-dorado hover:text-espresso" />
            </div>
            <div className="mt-12 flex gap-8 border-t border-marfil/15 pt-5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-marfil/50">
              <span>Chocolate</span>
              <span>Café</span>
              <span>Ecuador</span>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-[480px] overflow-hidden border-t border-dorado/20 lg:min-h-[680px] lg:border-l lg:border-t-0">
          <img src={chocolateSplash} alt="Chocolate y granos de cacao de Ruiseñor" width={768} height={765} fetchPriority="high" decoding="sync" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/75 via-espresso/10 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between border-t border-dorado/60 pt-4 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-marfil sm:left-10 sm:right-10">
            <span>Chocolate artesanal</span>
            <a href="#lineas" className="inline-flex items-center gap-2 text-dorado hover:text-marfil">Explorar líneas <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <span className="absolute right-5 top-5 border border-dorado bg-espresso/80 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-dorado sm:right-10 sm:top-10">R / 01</span>
        </div>
      </div>
    </section>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { BrandLogo } from '../ui/BrandLogo'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

export function StorySection() {
  return (
    <section id="historia" className="bg-cacao px-5 py-20 text-marfil lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <SectionKicker light>Historia de marca</SectionKicker>
          <BrandLogo size="lg" className="mt-8" />
          <p className="mt-5 max-w-xs text-xs leading-5 text-marfil/55">El relato de origen, el significado del nombre y el dato “1985” se completarán después de validarlos con el dueño.</p>
        </Reveal>
        <Reveal className="lg:pt-10">
          <h2 className="max-w-3xl font-serif-brand text-5xl font-semibold leading-[0.92] sm:text-7xl">Una etiqueta que cuenta algo antes de abrirla<span className="text-dorado">.</span></h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-marfil/65">La sección de historia usará el lenguaje visual del empaque: una firma, una línea dorada y datos concretos. Nada de frases genéricas; solo información que la marca pueda respaldar.</p>
          <div className="mt-10 grid gap-5 border-t border-marfil/20 pt-6 sm:grid-cols-3">
            {['Origen', 'Proceso', 'Identidad'].map((item, index) => (
              <div key={item} className="border-r border-marfil/15 pr-5 last:border-0"><span className="font-serif-brand text-3xl text-dorado">0{index + 1}</span><p className="mt-4 text-sm font-semibold">{item}</p><p className="mt-2 text-xs leading-5 text-marfil/50">Contenido por confirmar</p></div>
            ))}
          </div>
          <a href="#contacto" className="mt-9 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-dorado hover:text-marfil">Completar historia <ArrowUpRight size={15} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  )
}

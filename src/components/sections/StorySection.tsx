import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

export function StorySection() {
  return (
    <section id="historia" className="bg-cacao px-5 py-20 text-marfil lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <SectionKicker light>Historia de marca</SectionKicker>
          <p className="mt-8 font-serif-brand text-[clamp(4.5rem,3rem+9vw,10rem)] font-semibold leading-[0.85] text-dorado">Ecuador</p>
          <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-marfil/55">Naranjal · Guayas</p>
        </Reveal>
        <Reveal className="lg:pt-10">
          <h2 className="max-w-3xl font-serif-brand text-5xl font-semibold leading-[0.92] sm:text-7xl">Una etiqueta que cuenta algo antes de abrirla<span className="text-dorado">.</span></h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-marfil/65">Desde el recinto Flor y Selva en Naranjal, Ruiseñor transforma cacao y café de origen ecuatoriano en productos elaborados con cuidado.</p>
          <div className="mt-10 max-w-2xl border-t border-marfil/20 pt-6">
            <motion.span
              className="block h-px w-10 origin-left bg-dorado"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <span className="mt-4 block font-serif-brand text-3xl text-dorado">01</span>
            <p className="mt-4 text-sm font-semibold">Origen</p>
            <p className="mt-2 text-sm leading-6 text-marfil/60">Ruiseñor Chocolate es una marca ecuatoriana del sector alimenticio y agroindustrial, con experiencia en la producción artesanal de cacao y café.</p>
          </div>
          <a href="#catalogo" className="mt-9 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-dorado hover:text-marfil">Ver catálogo <ArrowUpRight size={15} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  )
}

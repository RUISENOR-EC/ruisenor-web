import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import chocolateSplash from '../../assets/brand/chocolate-splash.jpg'
import { BrandLogo } from '../ui/BrandLogo'
import { SectionKicker } from '../ui/SectionKicker'
import { Reveal } from '../ui/Reveal'
import { WhatsAppButton } from '../../features/contact/WhatsAppButton'

const LINE_EASE = [0.16, 1, 0.3, 1] as const

/**
 * One masked line of the hero headline, ported from the approved mockup's
 * `.line-mask` / `.line-inner` pair: an overflow-hidden mask with an inner
 * span that slides up from 112% on scroll-into-view.
 */
function HeroTitleLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '112%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: LINE_EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Ported from the mockup's onScroll() handler, which set
  // heroImg.style.transform = translateY(scrollY * 0.12). Scoped to the
  // section via useScroll's target/offset instead of raw window.scrollY so
  // the shift stays bounded to the image's overframe while the hero scrolls
  // through view.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section ref={sectionRef} id="inicio" className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-espresso text-marfil">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={chocolateSplash}
          alt="Chocolate y granos de cacao de Ruiseñor"
          width={768}
          height={765}
          fetchPriority="high"
          decoding="sync"
          className="absolute -inset-x-[4%] -inset-y-[8%] h-[118%] w-[108%] object-cover will-change-transform"
          style={{ y: prefersReducedMotion ? 0 : parallaxY }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/60 to-espresso/20" aria-hidden="true" />
      <span aria-hidden="true" className="absolute right-5 top-5 z-10 border border-dorado bg-espresso/80 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-dorado sm:right-10 sm:top-10">R / 01</span>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-40">
        <Reveal>
          <SectionKicker light>Marca de origen</SectionKicker>
          <BrandLogo size="md" className="mt-8" />
        </Reveal>

        <h1 aria-label="Chocolate y café con identidad." className="mt-8 max-w-xl font-serif-brand text-5xl font-semibold leading-[0.92] tracking-[-0.03em] text-marfil sm:text-7xl">
          <HeroTitleLine>Chocolate y café</HeroTitleLine>
          <HeroTitleLine delay={0.1}>con identidad.</HeroTitleLine>
        </h1>

        <Reveal>
          <p className="mt-7 max-w-md text-base leading-7 text-marfil/65 sm:text-lg">Productos para regalar, compartir y disfrutar. Conoce las líneas actuales de Ruiseñor.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <motion.a
              href="#catalogo"
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative inline-flex min-h-12 items-center gap-3 overflow-hidden bg-dorado px-5 py-3 text-sm font-bold text-espresso"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <span>Ver catálogo</span>
                <ArrowDownRight size={17} aria-hidden="true" />
              </span>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-marfil/60 to-transparent"
                variants={{ rest: { x: '-120%' }, hover: { x: '120%' } }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              />
            </motion.a>
            <WhatsAppButton label="Consultar" className="bg-transparent ring-1 ring-dorado hover:bg-dorado hover:text-espresso" />
          </div>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-marfil/15 pt-5">
            <div className="flex gap-8 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-marfil/50">
              <span>Chocolate</span>
              <span>Café</span>
              <span>Ecuador</span>
            </div>
            <a href="#lineas" className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-dorado hover:text-marfil">
              Explorar líneas <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

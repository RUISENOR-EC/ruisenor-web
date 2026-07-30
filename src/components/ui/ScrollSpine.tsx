import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export interface ScrollSpineItem {
  label: string
  href: string
}

interface ScrollSpineProps {
  items: readonly ScrollSpineItem[]
}

interface SpineDot {
  id: string
  label: string
  top: number
}

/**
 * Fixed left-edge progress spine, ported from the approved mockup's
 * `.spine` / `.spine-fill` / `.spine-dot` + layoutDots()/onScroll() logic.
 * Fill height tracks scroll progress via motion's useScroll; dot vertical
 * position is each target section's offsetTop over total scrollable
 * height, recomputed on resize and once fonts finish loading; the active
 * dot is toggled by an IntersectionObserver on each target section.
 * Hidden below `lg` to match the mockup's max-width:1020px breakpoint.
 */
export function ScrollSpine({ items }: ScrollSpineProps) {
  const { scrollYProgress } = useScroll()
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const [dots, setDots] = useState<SpineDot[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    function layoutDots() {
      const total = document.body.scrollHeight - window.innerHeight
      if (total <= 0) return
      setDots(
        items.map((item) => {
          const id = item.href.replace('#', '')
          const section = document.getElementById(id)
          const top = section ? Math.min((section.offsetTop / total) * 100, 100) : 0
          return { id, label: item.label, top }
        }),
      )
    }

    layoutDots()
    window.addEventListener('resize', layoutDots)
    window.addEventListener('load', layoutDots)

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layoutDots)
    }

    return () => {
      window.removeEventListener('resize', layoutDots)
      window.removeEventListener('load', layoutDots)
    }
  }, [items])

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.replace('#', '')))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Progreso de navegación"
      className="hidden lg:block fixed left-[22px] top-[70px] bottom-[70px] w-[2px] z-[45] bg-dorado/15"
    >
      <motion.div className="absolute top-0 left-0 w-full bg-dorado" style={{ height: fillHeight }} />
      {dots.map((dot) => (
        <a
          key={dot.id}
          href={`#${dot.id}`}
          aria-label={dot.label}
          className={`absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 ${
            activeId === dot.id
              ? 'scale-[1.35] border-dorado bg-dorado'
              : 'border-dorado/40 bg-transparent'
          }`}
          style={{ top: `${dot.top}%` }}
        />
      ))}
    </nav>
  )
}

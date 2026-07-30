import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface CountUpProps {
  value: number
  className?: string
}

const DURATION_MS = 1400

/**
 * Animates a number from 0 up to `value` once it scrolls into view, ported
 * from the approved mockup's `data-count` tick()/requestAnimationFrame
 * logic (cubic ease-out, ~1.4s). Jumps straight to the final value when the
 * user prefers reduced motion. No thousands separators.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }

    let frame = 0
    let start: number | null = null

    function tick(timestamp: number) {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [isInView, prefersReducedMotion, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

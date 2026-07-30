import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react'
import type { RefObject } from 'react'

export interface UseTiltOptions {
  /** Maximum rotation in degrees applied on either axis. */
  max?: number
}

export interface UseTiltStyle {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  transformPerspective: number
}

export interface UseTiltResult<T extends HTMLElement> {
  ref: RefObject<T | null>
  style: UseTiltStyle | Record<string, never>
}

const SPRING_OPTIONS = { stiffness: 300, damping: 30, mass: 0.6 }
const PERSPECTIVE = 900

/**
 * Pointer-driven 3D tilt, ported from the approved mockup's `.tilt` +
 * `pointermove` handler. Rotation is spring-smoothed via motion's
 * useMotionValue/useSpring instead of the mockup's raw CSS transition.
 *
 * No-ops (identity/empty style) when the user prefers reduced motion or on
 * devices without hover capability (touch), matching the mockup's
 * `hoverCapable && !reduced` guard.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(
  options?: UseTiltOptions,
): UseTiltResult<T> {
  const { max = 7 } = options ?? {}
  const ref = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, SPRING_OPTIONS)
  const springRotateY = useSpring(rotateY, SPRING_OPTIONS)

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false)
      return
    }
    setEnabled(window.matchMedia('(hover: hover)').matches)
  }, [prefersReducedMotion])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    function handlePointerMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      rotateX.set(-py * max)
      rotateY.set(px * max)
    }

    function handlePointerLeave() {
      rotateX.set(0)
      rotateY.set(0)
    }

    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [enabled, max, rotateX, rotateY])

  if (!enabled) {
    return { ref, style: {} }
  }

  return {
    ref,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      transformPerspective: PERSPECTIVE,
    },
  }
}

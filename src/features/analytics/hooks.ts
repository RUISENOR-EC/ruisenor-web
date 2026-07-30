import { useContext, useEffect, useRef } from 'react'
import type { AnalyticsEventName } from './events'
import { AnalyticsContext } from './analytics.context'

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) throw new Error('useAnalytics must be used inside AnalyticsProvider')

  return context
}

export function useTrackSection(sectionId: string, eventName: AnalyticsEventName) {
  const { track } = useAnalytics()
  const hasTracked = useRef(false)

  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTracked.current) return

        hasTracked.current = true
        void track({ eventName, target: sectionId })
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [eventName, sectionId, track])
}

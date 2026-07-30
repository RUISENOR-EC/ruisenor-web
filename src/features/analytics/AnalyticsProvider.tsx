import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react'
import { fairData } from '../qr/data/fair'
import { getFairCampaign, type FairCampaign } from '../qr/fair.service'
import { AnalyticsContext } from './analytics.context'
import type { TrackEventInput } from './events'
import { trackEvent } from './trackEvent'

function isQrVisit() {
  if (typeof window === 'undefined') return false

  return new URLSearchParams(window.location.search).get('utm_source') === 'qr'
}

function markQrVisit(campaignId: string) {
  if (typeof window === 'undefined') return false

  try {
    const key = `ruisenor_qr_visit_${campaignId}`
    if (window.sessionStorage.getItem(key)) return false

    window.sessionStorage.setItem(key, '1')
    return true
  } catch {
    return true
  }
}

export function AnalyticsProvider({ children }: PropsWithChildren) {
  const [campaign, setCampaign] = useState<FairCampaign | null>(null)
  const trackedPageView = useRef(false)

  useEffect(() => {
    let mounted = true

    getFairCampaign(fairData.slug).then((data) => {
      if (mounted) setCampaign(data)
    })

    return () => {
      mounted = false
    }
  }, [])

  const track = useCallback(
    (event: Omit<TrackEventInput, 'campaignId'>) => {
      if (!campaign) return Promise.resolve(false)

      return trackEvent({ ...event, campaignId: campaign.id })
    },
    [campaign],
  )

  useEffect(() => {
    if (!campaign || trackedPageView.current) return

    trackedPageView.current = true
    void track({ eventName: 'page_view', target: 'home' })

    if (isQrVisit() && markQrVisit(campaign.id)) {
      void track({ eventName: 'qr_visit', target: 'feria' })
    }
  }, [campaign, track])

  const value = useMemo(() => ({ campaign, track }), [campaign, track])

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

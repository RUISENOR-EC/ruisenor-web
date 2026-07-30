import { supabase } from '../../lib/supabase/client'
import type { TrackEventInput } from './events'

type StorageArea = 'localStorage' | 'sessionStorage'

function createIdentifier() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getStoredIdentifier(area: StorageArea, key: string) {
  if (typeof window === 'undefined') return createIdentifier()

  try {
    const storage = window[area]
    const existing = storage.getItem(key)
    if (existing) return existing

    const identifier = createIdentifier()
    storage.setItem(key, identifier)
    return identifier
  } catch {
    return createIdentifier()
  }
}

function getCampaignMetadata() {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)

  return {
    campaign: params.get('campaign'),
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaignTag: params.get('utm_campaign'),
  }
}

export async function trackEvent({ campaignId, eventName, page, target, metadata = {} }: TrackEventInput) {
  const { error } = await supabase.from('analytics_events').insert({
    campaign_id: campaignId,
    event_name: eventName,
    visitor_id: getStoredIdentifier('localStorage', 'ruisenor_visitor_id'),
    session_id: getStoredIdentifier('sessionStorage', 'ruisenor_session_id'),
    page: page ?? (typeof window === 'undefined' ? '/' : `${window.location.pathname}${window.location.hash}`),
    target: target ?? null,
    metadata: { ...getCampaignMetadata(), ...metadata },
  })

  return !error
}

import { createContext } from 'react'
import type { FairCampaign } from '../qr/fair.service'
import type { TrackEventInput } from './events'

export type AnalyticsContextValue = {
  campaign: FairCampaign | null
  track: (event: Omit<TrackEventInput, 'campaignId'>) => Promise<boolean>
}

export const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

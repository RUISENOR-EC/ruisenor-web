import { supabase } from '../../lib/supabase/client'
import { getCampaignDetail, type FairCampaignContent } from './data/fair'

export type FairCampaign = FairCampaignContent & {
  id: string
  active: boolean
}

export async function getFairCampaign(slug: string): Promise<FairCampaign | null> {
  const { data, error } = await supabase
    .from('campaigns')
    .select('id, slug, name, event_date, location, stand, promotion, active')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle()

  if (error || !data) return null

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    date: getCampaignDetail(data.event_date),
    location: getCampaignDetail(data.location),
    stand: getCampaignDetail(data.stand),
    promotion: getCampaignDetail(data.promotion),
    active: data.active,
  }
}

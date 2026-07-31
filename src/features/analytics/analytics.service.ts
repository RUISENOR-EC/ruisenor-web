import { supabase } from '../../lib/supabase/client'

type AnalyticsEventRow = {
  event_name: string
  target: string | null
  visitor_id: string
  created_at: string
  metadata: Record<string, unknown>
}

export type DailyMetric = {
  label: string
  value: number
}

export type ProductMetric = {
  name: string
  value: number
}

export type AnalyticsSummary = {
  qrVisits: number
  uniqueVisitors: number
  tiktokClicks: number
  facebookClicks: number
  whatsappClicks: number
  productsViewed: number
  promotionViews: number
  fairQuizStarts: number
  fairQuizCompleted: number
  fairRecommendationViews: number
  fairQuizWhatsAppClicks: number
  interactions: number
  daily: DailyMetric[]
  topProducts: ProductMetric[]
}

function countByEvent(rows: AnalyticsEventRow[], eventName: string) {
  return rows.filter((row) => row.event_name === eventName).length
}

function buildDailyMetrics(rows: AnalyticsEventRow[]) {
  const daily = new Map<string, number>()

  rows
    .filter((row) => row.event_name === 'qr_visit')
    .forEach((row) => {
      const date = new Date(row.created_at)
      const key = date.toISOString().slice(0, 10)
      daily.set(key, (daily.get(key) ?? 0) + 1)
    })

  return [...daily.entries()].map(([key, value]) => ({
    label: new Intl.DateTimeFormat('es-EC', { day: '2-digit', month: 'short' }).format(new Date(`${key}T12:00:00`)),
    value,
  }))
}

function buildProductMetrics(rows: AnalyticsEventRow[]) {
  const products = new Map<string, number>()

  rows
    .filter((row) => ['product_view', 'fair_recommendation_view'].includes(row.event_name))
    .forEach((row) => {
      const name = typeof row.metadata.productName === 'string' ? row.metadata.productName : row.target ?? 'Producto'
      products.set(name, (products.get(name) ?? 0) + 1)
    })

  return [...products.entries()]
    .sort(([, first], [, second]) => second - first)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }))
}

export async function getAnalyticsSummary(campaignId: string, days: number | null): Promise<AnalyticsSummary> {
  let query = supabase
    .from('analytics_events')
    .select('event_name, target, visitor_id, created_at, metadata')
    .eq('campaign_id', campaignId)
    .order('created_at', { ascending: true })
    .limit(10000)

  if (days) {
    const start = new Date()
    start.setDate(start.getDate() - days)
    query = query.gte('created_at', start.toISOString())
  }

  const { data, error } = await query
  if (error) throw error

  const rows = (data ?? []) as AnalyticsEventRow[]
  const qrRows = rows.filter((row) => row.event_name === 'qr_visit')
  const uniqueVisitors = new Set(qrRows.map((row) => row.visitor_id)).size

  return {
    qrVisits: qrRows.length,
    uniqueVisitors,
    tiktokClicks: countByEvent(rows, 'tiktok_click'),
    facebookClicks: countByEvent(rows, 'facebook_click'),
    whatsappClicks: countByEvent(rows, 'whatsapp_click'),
    productsViewed: countByEvent(rows, 'product_view'),
    promotionViews: countByEvent(rows, 'promotion_view'),
    fairQuizStarts: countByEvent(rows, 'fair_quiz_started'),
    fairQuizCompleted: countByEvent(rows, 'fair_quiz_completed'),
    fairRecommendationViews: countByEvent(rows, 'fair_recommendation_view'),
    fairQuizWhatsAppClicks: rows.filter((row) => row.event_name === 'whatsapp_click' && row.metadata.entryPoint === 'fair_recommendation').length,
    interactions: rows.filter((row) => !['page_view', 'qr_visit'].includes(row.event_name)).length,
    daily: buildDailyMetrics(rows),
    topProducts: buildProductMetrics(rows),
  }
}

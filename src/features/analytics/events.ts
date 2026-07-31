export type AnalyticsEventName =
  | 'qr_visit'
  | 'page_view'
  | 'catalog_view'
  | 'product_view'
  | 'tiktok_click'
  | 'facebook_click'
  | 'whatsapp_click'
  | 'promotion_view'
  | 'coupon_click'
  | 'social_view'
  | 'fair_quiz_started'
  | 'fair_quiz_answered'
  | 'fair_quiz_completed'
  | 'fair_recommendation_view'

export type TrackEventInput = {
  campaignId: string
  eventName: AnalyticsEventName
  page?: string
  target?: string
  metadata?: Record<string, string | number | boolean | null>
}

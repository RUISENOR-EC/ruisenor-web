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

export type TrackEventInput = {
  campaignId: string
  eventName: AnalyticsEventName
  page?: string
  target?: string
  metadata?: Record<string, string | number | boolean | null>
}

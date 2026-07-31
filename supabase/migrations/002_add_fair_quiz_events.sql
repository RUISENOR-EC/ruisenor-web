alter table public.analytics_events
  drop constraint if exists analytics_events_event_name_check;

alter table public.analytics_events
  add constraint analytics_events_event_name_check
  check (event_name in (
    'qr_visit',
    'page_view',
    'catalog_view',
    'product_view',
    'tiktok_click',
    'facebook_click',
    'whatsapp_click',
    'promotion_view',
    'coupon_click',
    'social_view',
    'fair_quiz_started',
    'fair_quiz_answered',
    'fair_quiz_completed',
    'fair_recommendation_view'
  ));

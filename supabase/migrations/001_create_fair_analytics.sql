create extension if not exists pgcrypto;

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  event_date text not null,
  location text not null,
  stand text not null,
  promotion text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'analyst')),
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  event_name text not null check (event_name in (
    'qr_visit',
    'page_view',
    'catalog_view',
    'product_view',
    'tiktok_click',
    'facebook_click',
    'whatsapp_click',
    'promotion_view',
    'coupon_click'
  )),
  visitor_id text not null check (char_length(visitor_id) between 1 and 128),
  session_id text not null check (char_length(session_id) between 1 and 128),
  page text not null default '/',
  target text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_campaign_created_idx
  on public.analytics_events (campaign_id, created_at desc);

create index if not exists analytics_events_name_created_idx
  on public.analytics_events (event_name, created_at desc);

insert into public.campaigns (slug, name, event_date, location, stand, promotion)
values (
  'feria-cangrejo-2026',
  'Feria del Cangrejo',
  'Fecha por confirmar',
  'Ubicación por confirmar',
  'Stand por confirmar',
  'Promoción por confirmar'
)
on conflict (slug) do nothing;

alter table public.campaigns enable row level security;
alter table public.analytics_admins enable row level security;
alter table public.analytics_events enable row level security;

create or replace function public.is_analytics_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.analytics_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_analytics_admin() from public;
grant execute on function public.is_analytics_admin() to anon, authenticated;

drop policy if exists "Public can view active campaigns" on public.campaigns;
drop policy if exists "Admins can create campaigns" on public.campaigns;
drop policy if exists "Admins can update campaigns" on public.campaigns;
drop policy if exists "Admins can delete campaigns" on public.campaigns;
drop policy if exists "Admins can view analytics" on public.analytics_events;
drop policy if exists "Public can record analytics" on public.analytics_events;

create policy "Public can view active campaigns"
  on public.campaigns
  for select
  to anon, authenticated
  using (active = true or public.is_analytics_admin());

create policy "Admins can create campaigns"
  on public.campaigns
  for insert
  to authenticated
  with check (public.is_analytics_admin());

create policy "Admins can update campaigns"
  on public.campaigns
  for update
  to authenticated
  using (public.is_analytics_admin())
  with check (public.is_analytics_admin());

create policy "Admins can delete campaigns"
  on public.campaigns
  for delete
  to authenticated
  using (public.is_analytics_admin());

create policy "Admins can view analytics"
  on public.analytics_events
  for select
  to authenticated
  using (public.is_analytics_admin());

create policy "Public can record analytics"
  on public.analytics_events
  for insert
  to anon, authenticated
  with check (
    exists (
      select 1
      from public.campaigns
      where id = campaign_id and active = true
    )
  );

-- Los datos de feria sin confirmar no deben aparecer en la web pública ni en el panel.
update public.campaigns
set
  event_date = case when event_date = 'Fecha por confirmar' then '' else event_date end,
  location = case when location = 'Ubicación por confirmar' then '' else location end,
  stand = case when stand = 'Stand por confirmar' then '' else stand end,
  promotion = case when promotion = 'Promoción por confirmar' then '' else promotion end
where slug = 'feria-cangrejo-2026';

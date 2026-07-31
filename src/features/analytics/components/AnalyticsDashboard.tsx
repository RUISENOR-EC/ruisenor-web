import { BarChart3, CalendarDays, Download, Eye, LogOut, MessageCircle, MousePointerClick, RefreshCw, Send, Sparkles, Users } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { QRCodeCanvas } from 'qrcode.react'
import { Area, AreaChart as RechartsAreaChart, Bar, BarChart as RechartsBarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ruisenorLogo from '../../../assets/brand/ruisenor-logo.jpg'
import { BrandLogo } from '../../../components/ui/BrandLogo'
import { CountUp } from '../../../components/ui/CountUp'
import { Reveal } from '../../../components/ui/Reveal'
import { supabase } from '../../../lib/supabase/client'
import { fairData, getFairQrUrl, isLocalFairQrUrl } from '../../qr/data/fair'
import { getFairCampaign, type FairCampaign } from '../../qr/fair.service'
import { getAnalyticsSummary, type AnalyticsSummary } from '../analytics.service'

type AnalyticsDashboardProps = {
  session: Session
}

const ranges = [
  { label: '7 días', value: 7 },
  { label: '30 días', value: 30 },
  { label: 'Todo', value: null },
] as const

const EMPTY_SUMMARY: AnalyticsSummary = {
  qrVisits: 0,
  uniqueVisitors: 0,
  tiktokClicks: 0,
  facebookClicks: 0,
  whatsappClicks: 0,
  productsViewed: 0,
  promotionViews: 0,
  fairQuizStarts: 0,
  fairQuizCompleted: 0,
  fairRecommendationViews: 0,
  fairQuizWhatsAppClicks: 0,
  interactions: 0,
  daily: [],
  topProducts: [],
}

const FALLBACK_CAMPAIGN: FairCampaign = { ...fairData, id: '', active: false }

// Same feTurbulence grain data-uri used by header.top::before in the approved admin mockup.
const grainOverlayStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
}

type DashboardTooltipProps = {
  active?: boolean
  label?: string
  payload?: Array<{ color?: string; name?: string; value?: number | string }>
}

function DashboardTooltip({ active, label, payload }: DashboardTooltipProps) {
  if (!active || !payload?.length) return null

  const item = payload[0]

  return (
    <div className="border border-cacao/15 bg-espresso px-3 py-2 text-xs text-marfil shadow-xl">
      <p className="text-marfil/55">{label}</p>
      <p className="mt-1 flex items-center gap-2 font-bold"><span className="size-2 rounded-full" style={{ backgroundColor: item.color ?? '#c59a3a' }} />{item.name ?? 'Eventos'}: {item.value}</p>
    </div>
  )
}

function MetricCard({ label, value, icon: Icon, accent = 'gold' }: { label: string; value: number; icon: typeof Eye; accent?: 'gold' | 'red' }) {
  return (
    <article className="group relative overflow-hidden border border-cacao/15 bg-marfil p-5">
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-dorado via-dorado/70 to-dorado transition-transform duration-[400ms] ease-out group-hover:scale-x-100" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4"><p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink/70">{label}</p><span className={`grid size-9 place-items-center ${accent === 'red' ? 'bg-rojo-marca text-marfil' : 'bg-dorado text-espresso'}`}><Icon size={17} aria-hidden="true" /></span></div>
      <CountUp value={value} className="mt-5 block font-serif-brand text-5xl font-semibold leading-none text-cacao" />
    </article>
  )
}

function FairQuizFunnel({ summary }: { summary: AnalyticsSummary }) {
  const completionRate = summary.fairQuizStarts ? Math.round((summary.fairQuizCompleted / summary.fairQuizStarts) * 100) : 0
  const stages = [
    { label: 'Iniciaron el perfil', value: summary.fairQuizStarts },
    { label: 'Recibieron recomendación', value: summary.fairRecommendationViews },
    { label: 'Consultaron por WhatsApp', value: summary.fairQuizWhatsAppClicks },
  ]

  return (
    <article className="mt-8 overflow-hidden border border-cacao/15 bg-cacao text-marfil">
      <div className="flex flex-col justify-between gap-5 border-b border-marfil/15 p-5 sm:flex-row sm:items-end sm:p-7">
        <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-dorado">Embudo de feria</p><h2 className="mt-2 font-serif-brand text-3xl font-semibold">Qué ocurre después de escanear el QR</h2></div>
        <p className="text-sm text-marfil/60"><strong className="font-serif-brand text-3xl font-semibold text-dorado">{completionRate}%</strong> completa las tres respuestas</p>
      </div>
      <ol className="grid divide-y divide-marfil/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stages.map((stage, index) => <li key={stage.label} className="p-5 sm:p-7"><span className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-dorado">0{index + 1}</span><CountUp value={stage.value} className="mt-4 block font-serif-brand text-5xl font-semibold leading-none" /><p className="mt-3 text-sm leading-5 text-marfil/60">{stage.label}</p></li>)}
      </ol>
    </article>
  )
}

function TrafficChart({ data }: { data: AnalyticsSummary['daily'] }) {
  if (!data.length) return <div className="grid min-h-60 place-items-center border border-dashed border-cacao/20 text-sm text-ink/70">Aún no hay visitas del QR en este periodo.</div>

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 12, right: 4, left: -22, bottom: 0 }}>
          <defs><linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c9002c" stopOpacity={0.35} /><stop offset="100%" stopColor="#c9002c" stopOpacity={0.02} /></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#2b1a14" strokeDasharray="3 3" strokeOpacity={0.12} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#2f241f', fillOpacity: 0.7, fontSize: 10 }} dy={8} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#2f241f', fillOpacity: 0.7, fontSize: 10 }} />
          <Tooltip content={<DashboardTooltip />} cursor={{ stroke: '#c59a3a', strokeDasharray: '3 3' }} />
          <Area type="monotone" dataKey="value" name="Visitas QR" stroke="#c9002c" strokeWidth={3} fill="url(#trafficFill)" activeDot={{ r: 5, fill: '#c59a3a', stroke: '#100e0d', strokeWidth: 2 }} isAnimationActive animationDuration={1300} animationEasing="ease-out" />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function SocialChart({ summary }: { summary: AnalyticsSummary }) {
  const data = [
    { name: 'TikTok', value: summary.tiktokClicks, color: '#c9002c' },
    { name: 'Facebook', value: summary.facebookClicks, color: '#2b1a14' },
    { name: 'WhatsApp', value: summary.whatsappClicks, color: '#c59a3a' },
  ]

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 12, right: 4, left: -22, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#2b1a14" strokeDasharray="3 3" strokeOpacity={0.12} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#2f241f', fillOpacity: 0.7, fontSize: 10 }} dy={8} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#2f241f', fillOpacity: 0.7, fontSize: 10 }} />
          <Tooltip content={<DashboardTooltip />} cursor={{ fill: '#2b1a14', fillOpacity: 0.05 }} />
          <Bar dataKey="value" name="Clics" radius={[5, 5, 0, 0]} isAnimationActive animationDuration={1300} animationEasing="ease-out">
            {data.map((item) => <Cell key={item.name} fill={item.color} />)}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

function QrDownloadCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const qrValue = getFairQrUrl()
  const isLocalQr = isLocalFairQrUrl(qrValue)

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `ruisenor-qr-${fairData.slug}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <article className="mt-8 border border-cacao/15 bg-marfil p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-rojo-marca">Material para imprimir</p>
          <h2 className="mt-2 font-serif-brand text-3xl font-semibold text-cacao">Código QR de la campaña</h2>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex min-h-12 items-center gap-2 border border-cacao bg-cacao px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-marfil transition hover:border-dorado hover:bg-dorado hover:text-espresso"
        >
          <Download size={15} aria-hidden="true" /> Descargar PNG
        </button>
      </div>
      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="border border-dorado/40 bg-marfil p-4">
          <QRCodeCanvas
            ref={canvasRef}
            value={qrValue}
            size={1024}
            bgColor="#F1EBE2"
            fgColor="#100E0D"
            level="H"
            imageSettings={{ src: ruisenorLogo, height: 176, width: 176, excavate: true }}
            className="h-auto w-40 max-w-full"
          />
        </div>
        <div className="max-w-sm space-y-3 text-sm leading-6 text-ink/70"><p>Es el mismo código que verán los visitantes en la sección de Feria del sitio público. Se descarga a 1024 px para imprimirlo en el stand, tarjetas o material promocional.</p>{isLocalQr && <p className="border-l-2 border-rojo-marca pl-3 text-rojo-marca"><strong className="font-semibold">No lo imprimas todavía.</strong> Este QR apunta a una dirección local. Configura <code>VITE_PUBLIC_SITE_URL</code> con la URL de Netlify y vuelve a descargarlo.</p>}</div>
      </div>
    </article>
  )
}

export function AnalyticsDashboard({ session }: AnalyticsDashboardProps) {
  const [campaign, setCampaign] = useState<FairCampaign | null>(null)
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [range, setRange] = useState<number | null>(30)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError('')

    const activeCampaign = await getFairCampaign(fairData.slug)
    if (!activeCampaign) {
      // No active campaign row in Supabase yet — show the page fully
      // functional with the local fallback campaign and zeroed metrics
      // instead of a dead end, so the dashboard is never blank/broken.
      setCampaign(FALLBACK_CAMPAIGN)
      setSummary(EMPTY_SUMMARY)
      setLoading(false)
      return
    }

    try {
      const nextSummary = await getAnalyticsSummary(activeCampaign.id, range)
      setCampaign(activeCampaign)
      setSummary(nextSummary)
    } catch {
      setCampaign(activeCampaign)
      setSummary(EMPTY_SUMMARY)
      setError('Tu usuario todavía no tiene permiso para consultar estas métricas. Agrega su UUID en analytics_admins.')
    } finally {
      setLoading(false)
    }
  }, [range])

  useEffect(() => {
    void loadDashboard()
  }, [loadDashboard])

  const lastUpdated = new Intl.DateTimeFormat('es-EC', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <main className="min-h-screen bg-crema text-espresso">
      <header className="relative overflow-hidden border-b-2 border-dorado bg-espresso px-5 py-5 text-marfil lg:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]" style={grainOverlayStyle} aria-hidden="true" />
        <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between gap-5">
          <div className="flex items-center gap-4"><BrandLogo size="sm" className="rounded-full" /><div><p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-dorado">Área privada</p><p className="mt-1 font-serif-brand text-2xl font-semibold">Analítica Ruiseñor</p></div></div>
          <div className="flex items-center gap-3"><span className="hidden text-xs text-marfil/50 sm:block">{session.user.email}</span><button type="button" onClick={handleSignOut} className="inline-flex min-h-12 items-center gap-2 border border-marfil/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-dorado hover:text-dorado"><LogOut size={15} aria-hidden="true" /> Salir</button></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10 lg:py-14">
        <div className="flex flex-col justify-between gap-6 border-b border-cacao/15 pb-8 md:flex-row md:items-end">
          <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-rojo-marca">Campaña activa</p><h1 className="mt-3 font-serif-brand text-5xl font-semibold leading-none text-cacao sm:text-7xl">{campaign?.name ?? 'Cargando campaña…'}</h1>{campaign?.date && <p className="mt-4 flex items-center gap-2 text-sm text-ink/70"><CalendarDays size={16} aria-hidden="true" /> {campaign.date}</p>}</div>
          <div className="flex flex-wrap items-center gap-2"><div className="flex border border-cacao/15 bg-marfil p-1">{ranges.map((item) => <button key={item.label} type="button" onClick={() => setRange(item.value)} className={`min-h-12 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] transition ${range === item.value ? 'bg-cacao text-marfil' : 'text-cacao/70 hover:text-cacao'}`}>{item.label}</button>)}</div><button type="button" onClick={() => void loadDashboard()} className="grid size-12 place-items-center border border-cacao/15 bg-marfil text-cacao transition hover:border-dorado" aria-label="Actualizar métricas"><RefreshCw size={17} aria-hidden="true" /></button></div>
        </div>

        <QrDownloadCard />

        {error && <div className="mt-8 border border-rojo-marca/40 bg-rojo-marca/5 p-5 text-sm leading-6 text-rojo-marca">{error}</div>}

        {loading ? <div className="mt-8 border border-dashed border-cacao/20 p-8 text-sm text-ink/70">Cargando métricas…</div> : summary && <>
          <FairQuizFunnel summary={summary} />
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Visitas QR" value={summary.qrVisits} icon={Eye} />
            <MetricCard label="Visitantes únicos" value={summary.uniqueVisitors} icon={Users} />
            <MetricCard label="Clics TikTok" value={summary.tiktokClicks} icon={Send} accent="red" />
            <MetricCard label="Clics WhatsApp" value={summary.whatsappClicks} icon={MessageCircle} accent="red" />
          </section>

          <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Productos consultados" value={summary.productsViewed} icon={MousePointerClick} />
            <MetricCard label="Promoción vista" value={summary.promotionViews} icon={Sparkles} />
            <MetricCard label="Clics Facebook" value={summary.facebookClicks} icon={Send} />
            <MetricCard label="Interacciones" value={summary.interactions} icon={BarChart3} />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <Reveal><article className="border border-cacao/15 bg-marfil p-5 sm:p-7"><div className="flex items-end justify-between gap-4"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-rojo-marca">Tráfico del QR</p><h2 className="mt-2 font-serif-brand text-3xl font-semibold text-cacao">Visitas por día</h2></div><span className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-ink/70">{lastUpdated}</span></div><div className="mt-6"><TrafficChart data={summary.daily} /></div></article></Reveal>
            <Reveal transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}><article className="border border-cacao/15 bg-cacao p-5 text-marfil sm:p-7"><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-dorado">Interés del catálogo</p><h2 className="mt-2 font-serif-brand text-3xl font-semibold">Productos más consultados</h2><div className="mt-7 space-y-4">{summary.topProducts.length ? summary.topProducts.map((product) => <div key={product.name}><div className="flex justify-between gap-4 text-sm"><span className="truncate">{product.name}</span><span className="font-bold text-dorado">{product.value}</span></div><div className="mt-2 h-1 bg-marfil/15"><div className="h-full bg-dorado" style={{ width: `${Math.max((product.value / summary.topProducts[0].value) * 100, 8)}%` }} /></div></div>) : <p className="text-sm leading-6 text-marfil/55">Aún no hay productos consultados.</p>}</div></article></Reveal>
          </section>

          <Reveal><section className="mt-6 border border-cacao/15 bg-marfil p-5 sm:p-7"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-rojo-marca">Canales de contacto</p><h2 className="mt-2 font-serif-brand text-3xl font-semibold text-cacao">Clics por red social</h2></div><div className="mt-5"><SocialChart summary={summary} /></div></section></Reveal>

          <p className="mt-8 text-xs leading-5 text-ink/70">Los visitantes son anónimos y los visitantes únicos son una aproximación basada en el navegador. Campaña: {campaign?.slug}</p>
        </>}
      </div>
    </main>
  )
}

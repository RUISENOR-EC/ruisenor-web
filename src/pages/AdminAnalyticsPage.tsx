import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { AnalyticsDashboard } from '../features/analytics/components/AnalyticsDashboard'
import { AnalyticsLogin } from '../features/analytics/components/AnalyticsLogin'
import { supabase } from '../lib/supabase/client'

export function AdminAnalyticsPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
        setLoading(false)
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (loading) return <main className="grid min-h-screen place-items-center bg-espresso text-marfil">Cargando acceso…</main>
  if (!session) return <AnalyticsLogin />

  return <AnalyticsDashboard session={session} />
}

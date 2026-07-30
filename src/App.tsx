import { MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'
import { AnalyticsProvider } from './features/analytics/AnalyticsProvider'
import { HomePage } from './pages/HomePage'

const AdminAnalyticsPage = lazy(() => import('./pages/AdminAnalyticsPage').then(({ AdminAnalyticsPage: page }) => ({ default: page })))

function App() {
  const isAnalyticsRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/analytics')

  return (
    <MotionConfig reducedMotion="user">
      {isAnalyticsRoute ? <Suspense fallback={<main className="grid min-h-screen place-items-center bg-espresso text-marfil">Cargando dashboard…</main>}><AdminAnalyticsPage /></Suspense> : <AnalyticsProvider><HomePage /></AnalyticsProvider>}
    </MotionConfig>
  )
}

export default App

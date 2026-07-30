import { ArrowUpRight, LockKeyhole, MailCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { supabase } from '../../../lib/supabase/client'
import { BrandLogo } from '../../../components/ui/BrandLogo'

export function AnalyticsLogin() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/admin/analytics`,
      },
    })

    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }

    setStatus('sent')
  }

  return (
    <main className="grid min-h-screen bg-espresso text-marfil lg:grid-cols-[0.85fr_1.15fr]">
      <section className="paper-noise flex flex-col justify-between border-b border-dorado/20 px-6 py-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-10">
        <div>
          <BrandLogo size="sm" className="rounded-full" />
          <p className="mt-8 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-dorado">Área privada</p>
          <h1 className="mt-5 max-w-md font-serif-brand text-6xl font-semibold leading-[0.85] sm:text-8xl">Datos que cuentan la historia.</h1>
          <p className="mt-7 max-w-sm text-sm leading-6 text-marfil/60">Consulta el rendimiento de la campaña de Ruiseñor en la feria desde un espacio privado.</p>
        </div>
        <div className="mt-16 flex items-center gap-3 text-xs text-marfil/45"><LockKeyhole size={15} aria-hidden="true" /> Acceso protegido por Supabase Auth</div>
      </section>

      <section className="flex items-center bg-crema px-6 py-12 text-espresso sm:px-12 lg:px-20">
        <div className="w-full max-w-md">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-rojo-marca">Dashboard Ruiseñor</p>
          <h2 className="mt-4 font-serif-brand text-5xl font-semibold leading-none text-cacao">Acceder a las métricas</h2>
          <p className="mt-5 text-sm leading-6 text-ink/65">Escribe el correo autorizado. Recibirás un enlace de acceso de un solo uso.</p>

          {status === 'sent' ? (
            <div className="mt-8 border border-dorado bg-marfil p-5">
              <MailCheck className="text-rojo-marca" size={24} aria-hidden="true" />
              <p className="mt-4 font-semibold text-cacao">Revisa tu correo.</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">Enviamos un enlace a <span className="font-semibold text-ink">{email}</span>. Ábrelo en este mismo navegador.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-rojo-marca hover:text-cacao">Usar otro correo</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-cacao" htmlFor="analytics-email">Correo autorizado</label>
              <input id="analytics-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="dueno@ruisenor.ec" className="min-h-12 w-full border border-cacao/25 bg-marfil px-4 text-sm text-espresso outline-none transition placeholder:text-ink/35 focus:border-rojo-marca" />
              {status === 'error' && <p className="text-sm leading-6 text-rojo-marca">{message}</p>}
              <button type="submit" disabled={status === 'loading'} className="inline-flex min-h-12 w-full items-center justify-between bg-cacao px-5 py-3 text-sm font-bold text-marfil transition hover:bg-rojo-marca disabled:cursor-wait disabled:opacity-60">
                <span>{status === 'loading' ? 'Enviando enlace…' : 'Enviar enlace de acceso'}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </form>
          )}

          <a href="/" className="mt-8 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-cacao/55 hover:text-rojo-marca">Volver a la página pública</a>
        </div>
      </section>
    </main>
  )
}

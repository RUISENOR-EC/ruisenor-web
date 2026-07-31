import { MessageCircle, Phone } from 'lucide-react'
import { brand } from '../../config/brand'
import { WhatsAppButton } from '../../features/contact/WhatsAppButton'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

export function ContactSection() {
  return (
    <section id="contacto" className="bg-espresso px-5 py-20 text-marfil lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <Reveal>
          <SectionKicker light>Contacto directo</SectionKicker>
          <h2 className="mt-6 max-w-3xl font-serif-brand text-5xl font-semibold leading-[0.9] sm:text-7xl">¿Quieres pedir o conocer la disponibilidad?</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-marfil/60">El número oficial se colocará aquí y en el encabezado cuando el negocio lo confirme.</p>
          <WhatsAppButton className="mt-8" />
        </Reveal>
        <Reveal className="lg:border-l lg:border-dorado lg:pl-10">
          <div className="flex items-center gap-3 text-dorado"><Phone size={20} aria-hidden="true" /><span className="text-[0.62rem] font-bold uppercase tracking-[0.18em]">Teléfono / WhatsApp</span></div>
          <p className="mt-4 font-serif-brand text-3xl font-semibold text-marfil">{brand.phoneLabel}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-marfil/55"><MessageCircle size={16} aria-hidden="true" /> Respuesta directa del negocio</div>
        </Reveal>
      </div>
    </section>
  )
}

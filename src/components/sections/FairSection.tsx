import { CalendarDays, MapPin } from 'lucide-react'
import { brand } from '../../config/brand'
import { QrExperience } from '../../features/qr/QrExperience'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

export function FairSection() {
  return (
    <section id="feria" className="bg-dorado px-5 py-20 text-espresso lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <SectionKicker>Experiencia presencial</SectionKicker>
          <h2 className="mt-6 max-w-3xl font-serif-brand text-5xl font-semibold leading-[0.9] sm:text-7xl">Ruiseñor también se encuentra fuera de la pantalla.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-espresso/70">La Feria del Cangrejo tendrá una sección propia con fecha, ubicación, stand, QR y una promoción que el negocio pueda actualizar.</p>
          <div className="mt-8 grid max-w-xl gap-4 border-t border-espresso/20 pt-5 sm:grid-cols-2">
            <div className="flex gap-3"><CalendarDays size={18} aria-hidden="true" /><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-espresso/55">Fecha</p><p className="mt-1 text-sm font-semibold">{brand.fair.date}</p></div></div>
            <div className="flex gap-3"><MapPin size={18} aria-hidden="true" /><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-espresso/55">Lugar</p><p className="mt-1 text-sm font-semibold">{brand.fair.location}</p></div></div>
          </div>
        </Reveal>
        <Reveal className="mx-auto w-full max-w-xs rotate-1">
          <div className="border-2 border-espresso bg-marfil p-5 shadow-2xl shadow-espresso/20">
            <div className="flex items-start justify-between border-b border-dashed border-espresso/25 pb-4"><div><p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-espresso/55">Pase de feria</p><p className="mt-2 font-serif-brand text-3xl font-semibold">R / 01</p></div><span className="text-[0.58rem] font-bold uppercase tracking-[0.15em] text-rojo-marca">QR</span></div>
            <div className="py-6"><QrExperience value="https://www.tiktok.com/@ruisenorchocolate" /></div>
            <p className="border-t border-dashed border-espresso/25 pt-4 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-espresso/55">Catálogo · redes · contacto</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

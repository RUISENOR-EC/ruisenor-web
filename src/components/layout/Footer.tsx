import { ArrowUpRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { brand } from '../../config/brand'
import { BrandLogo } from '../ui/BrandLogo'

export function Footer() {
  return (
    <footer className="border-t border-marfil/10 bg-espresso px-5 py-10 text-marfil lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-8 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <BrandLogo size="sm" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-marfil/55">Chocolate y café presentados desde la identidad real de Ruiseñor.</p>
        </div>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-dorado">Contacto</p>
          <p className="mt-3 text-sm text-marfil/70">{brand.phoneLabel}</p>
          <a href={brand.whatsappHref} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-dorado hover:text-marfil"><FaWhatsapp size={16} aria-hidden="true" /> Escribir por WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-dorado">Redes</p>
          <div className="mt-3 space-y-2">
            {brand.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="flex items-center justify-between text-sm text-marfil/70 hover:text-dorado">
                <span>{social.label} · {social.handle}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1440px] border-t border-marfil/10 pt-5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-marfil/50">© 2026 Ruiseñor</div>
    </footer>
  )
}

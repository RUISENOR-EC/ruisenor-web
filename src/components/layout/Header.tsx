import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { brand } from '../../config/brand'
import { navigation } from '../../config/navigation'
import { BrandLogo } from '../ui/BrandLogo'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-dorado/20 bg-espresso/95 text-marfil backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-3 lg:px-10">
        <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="Ruiseñor, inicio">
          <BrandLogo size="sm" className="shrink-0" />
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate font-serif-brand text-xl font-semibold tracking-[0.12em] text-dorado">RUISEÑOR</span>
            <span className="block text-[0.56rem] font-bold uppercase tracking-[0.2em] text-marfil/55">{brand.descriptor}</span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-6 xl:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative pb-1 text-xs font-semibold text-marfil/70 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-dorado after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-dorado hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={brand.whatsappHref} className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-dorado px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-dorado transition hover:bg-dorado hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dorado">
          <MessageCircle size={15} aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}

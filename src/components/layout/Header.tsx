import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import { brand } from '../../config/brand'
import { navigation } from '../../config/navigation'
import { BrandLogo } from '../ui/BrandLogo'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-dorado/20 bg-espresso/95 text-marfil backdrop-blur-xl">
      <a
        href="#contenido"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-5 focus-visible:top-3 focus-visible:z-50 focus-visible:bg-dorado focus-visible:px-4 focus-visible:py-2 focus-visible:text-xs focus-visible:font-bold focus-visible:uppercase focus-visible:tracking-[0.12em] focus-visible:text-espresso"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-3 lg:px-10">
        <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="Ruiseñor, inicio">
          <BrandLogo size="sm" className="shrink-0" />
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate font-serif-brand text-xl font-semibold tracking-[0.12em] text-dorado">RUISEÑOR</span>
            <span className="block text-[0.56rem] font-bold uppercase tracking-[0.2em] text-marfil/55">{brand.descriptor}</span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">
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

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setIsMenuOpen((current) => !current)} aria-controls="mobile-navigation" aria-expanded={isMenuOpen} className="grid size-12 place-items-center border border-marfil/20 text-marfil transition hover:border-dorado hover:text-dorado lg:hidden"><span className="sr-only">{isMenuOpen ? 'Cerrar navegación' : 'Abrir navegación'}</span>{isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}</button>
          <a href={brand.whatsappHref} className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-dorado px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-dorado transition hover:bg-dorado hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dorado">
            <MessageCircle size={15} aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      {isMenuOpen && <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-t border-marfil/10 px-5 py-3 lg:hidden"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-5 gap-y-1"><a href="#perfil" onClick={() => setIsMenuOpen(false)} className="col-span-2 border-b border-marfil/10 py-3 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-dorado">Descubre tu producto</a>{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="min-h-12 py-3 text-sm font-semibold text-marfil/75 transition hover:text-dorado">{item.label}</a>)}</div></nav>}
    </header>
  )
}

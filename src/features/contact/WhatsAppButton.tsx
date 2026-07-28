import { MessageCircle } from 'lucide-react'
import { brand } from '../../config/brand'

type WhatsAppButtonProps = {
  label?: string
  className?: string
}

export function WhatsAppButton({ label = 'Pedir por WhatsApp', className = '' }: WhatsAppButtonProps) {
  return (
    <a href={brand.whatsappHref} className={`inline-flex min-h-12 items-center gap-3 bg-rojo-marca px-5 py-3 text-sm font-bold text-marfil transition hover:bg-cacao focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo-marca ${className}`}>
      <MessageCircle size={17} aria-hidden="true" />
      {label}
    </a>
  )
}

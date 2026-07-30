import { MessageCircle } from 'lucide-react'
import { useAnalytics } from '../analytics/hooks'
import { brand } from '../../config/brand'

type WhatsAppButtonProps = {
  label?: string
  className?: string
}

export function WhatsAppButton({ label = 'Pedir por WhatsApp', className = '' }: WhatsAppButtonProps) {
  const { track } = useAnalytics()

  return (
    <a
      href={brand.whatsappHref}
      onClick={() => void track({ eventName: 'whatsapp_click', target: 'whatsapp' })}
      className={`inline-flex min-h-12 items-center gap-3 bg-rojo-marca px-5 py-3 text-sm font-bold text-marfil transition hover:bg-cacao focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo-marca ${className}`}
    >
      <MessageCircle size={17} aria-hidden="true" />
      {label}
    </a>
  )
}

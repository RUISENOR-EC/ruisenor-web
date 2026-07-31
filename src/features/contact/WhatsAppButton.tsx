import { MessageCircle } from 'lucide-react'
import { useAnalytics } from '../analytics/hooks'
import { brand } from '../../config/brand'

type WhatsAppButtonProps = {
  label?: string
  className?: string
  message?: string
  metadata?: Record<string, string | number | boolean | null>
}

function getWhatsAppHref(message?: string) {
  if (!message || !/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(brand.whatsappHref)) return brand.whatsappHref

  const separator = brand.whatsappHref.includes('?') ? '&' : '?'
  return `${brand.whatsappHref}${separator}text=${encodeURIComponent(message)}`
}

export function WhatsAppButton({ label = 'Pedir por WhatsApp', className = '', message, metadata = {} }: WhatsAppButtonProps) {
  const { track } = useAnalytics()
  const href = getWhatsAppHref(message)

  return (
    <a
      href={href}
      onClick={() => void track({ eventName: 'whatsapp_click', target: 'whatsapp', metadata })}
      className={`inline-flex min-h-12 items-center gap-3 bg-rojo-marca px-5 py-3 text-sm font-bold text-marfil transition hover:bg-cacao focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo-marca ${className}`}
    >
      <MessageCircle size={17} aria-hidden="true" />
      {label}
    </a>
  )
}

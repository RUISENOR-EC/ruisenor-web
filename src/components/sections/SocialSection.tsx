import { ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaTiktok } from 'react-icons/fa6'
import { useAnalytics, useTrackSection } from '../../features/analytics/hooks'
import { brand } from '../../config/brand'
import { Reveal } from '../ui/Reveal'
import { SectionKicker } from '../ui/SectionKicker'

const socialIcons = {
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
} as const

export function SocialSection() {
  const { track } = useAnalytics()
  useTrackSection('redes', 'social_view')

  return (
    <section id="redes" className="bg-marfil px-5 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionKicker>Redes sociales</SectionKicker>
          <div className="mt-5 flex flex-col justify-between gap-5 border-b border-cacao/20 pb-8 md:flex-row md:items-end">
            <h2 className="font-serif-brand text-5xl font-semibold text-cacao sm:text-7xl">La marca también vive aquí<span className="text-rojo-marca">.</span></h2>
            <p className="max-w-xs text-sm leading-6 text-ink/70">Conecta con los perfiles reales de Ruiseñor y descubre el día a día del negocio.</p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {brand.socials.map((social, index) => {
            const SocialIcon = socialIcons[social.label]

            return (
              <Reveal key={social.label} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => void track({
                  eventName: social.label === 'TikTok' ? 'tiktok_click' : 'facebook_click',
                  target: social.label.toLowerCase(),
                  metadata: { handle: social.handle },
                })}
                className="group flex min-h-32 items-center justify-between border border-cacao/20 bg-crema p-6 transition hover:border-rojo-marca hover:bg-cacao hover:text-marfil sm:p-8"
              >
                <span className="flex items-center gap-4"><span className="grid size-12 place-items-center border border-current text-cacao transition group-hover:border-dorado group-hover:text-dorado"><SocialIcon size={22} aria-hidden="true" /></span><span><span className="block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-current/55">{social.label}</span><span className="mt-2 block font-serif-brand text-2xl font-semibold">{social.handle}</span></span></span><ArrowUpRight size={21} className="text-rojo-marca transition group-hover:text-dorado" aria-hidden="true" />
              </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { QRCodeSVG } from 'qrcode.react'

type QrExperienceProps = {
  value: string
}

export function QrExperience({ value }: QrExperienceProps) {
  return (
    <div className="border border-dorado/40 bg-marfil p-4 text-espresso">
      <QRCodeSVG value={value} size={132} bgColor="#F1EBE2" fgColor="#100E0D" title="Código QR de Ruiseñor" className="mx-auto h-auto w-full max-w-[132px]" />
      <p className="mt-4 text-center text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cacao/70">Escanea para conocer Ruiseñor</p>
    </div>
  )
}

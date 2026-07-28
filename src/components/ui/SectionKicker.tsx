type SectionKickerProps = {
  children: string
  light?: boolean
}

export function SectionKicker({ children, light = false }: SectionKickerProps) {
  return (
    <p className={`flex items-center gap-3 text-[0.64rem] font-bold uppercase tracking-[0.24em] ${light ? 'text-dorado' : 'text-rojo-marca'}`}>
      <span className={`h-px w-8 ${light ? 'bg-dorado' : 'bg-rojo-marca'}`} aria-hidden="true" />
      {children}
    </p>
  )
}

import logo from '../../assets/brand/ruisenor-logo.jpg'

type BrandLogoProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'size-12',
  md: 'size-20',
  lg: 'size-36',
} as const

export function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  return (
    <img
      src={logo}
      alt="Ruiseñor"
      width={350}
      height={352}
      className={`${sizes[size]} object-contain ${className}`}
    />
  )
}

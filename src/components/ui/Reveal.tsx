import { motion, type MotionProps } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = MotionProps & {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

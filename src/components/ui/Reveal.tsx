import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fades + slides children in when scrolled into view. */
export function Reveal({ children, delay = 0, className = '' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

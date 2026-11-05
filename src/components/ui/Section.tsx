import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  id: string
  /** Shown as a hex address, e.g. 0x01 */
  index: number
  title: string
  subtitle?: string
  children: ReactNode
}

/** Standard section wrapper with a "memory address" style heading. */
export function Section({ id, index, title, subtitle, children }: Props) {
  const addr = `0x${index.toString(16).padStart(2, '0').toUpperCase()}`
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-sm text-signal">{addr}</span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-trace to-transparent" />
        </div>
        {subtitle && <p className="-mt-8 mb-12 font-mono text-sm text-zinc-500">// {subtitle}</p>}
      </Reveal>
      {children}
    </section>
  )
}

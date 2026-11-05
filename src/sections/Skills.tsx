import { CircuitBoard, Code2 } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { portfolio } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import type { SkillGroup } from '../types'

type Filter = 'all' | SkillGroup['domain']

const tabs: { key: Filter; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'cs', label: 'computer_science' },
  { key: 'electronics', label: 'electronics' },
]

export function Skills() {
  const [filter, setFilter] = useState<Filter>('all')
  const groups = portfolio.skills.filter((g) => filter === 'all' || g.domain === filter)

  return (
    <Section id="skills" index={2} title="Skills" subtitle="software stack + hardware stack">
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors ${
              filter === t.key ? 'border-signal bg-signal/10 text-signal' : 'border-trace text-zinc-400 hover:text-white'
            }`}
          >
            [{t.label}]
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.title + filter} delay={i * 80}>
            <SkillCard group={g} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function SkillCard({ group }: { group: SkillGroup }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const isCS = group.domain === 'cs'
  const Icon = isCS ? Code2 : CircuitBoard
  const color = isCS ? 'var(--color-signal)' : 'var(--color-copper)'

  return (
    <div ref={ref} className="card p-6">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="h-5 w-5" style={{ color }} />
        <h3 className="font-semibold text-white">{group.title}</h3>
        <span className="ml-auto font-mono text-[10px] uppercase text-zinc-600">{group.domain}</span>
      </div>
      <ul className="space-y-4">
        {group.skills.map((s, i) => (
          <li key={s.name}>
            <div className="mb-1.5 flex justify-between font-mono text-xs">
              <span className="text-zinc-300">{s.name}</span>
              <span className="text-zinc-500">{s.level}%</span>
            </div>
            {/* bar styled like an LED level meter */}
            <div className="flex h-2 gap-0.5">
              {Array.from({ length: 20 }).map((_, k) => {
                const lit = inView && k < Math.round(s.level / 5)
                return (
                  <span
                    key={k}
                    className="flex-1 rounded-[1px] transition-all duration-300"
                    style={{
                      backgroundColor: lit ? color : 'var(--color-trace)',
                      boxShadow: lit ? `0 0 6px ${color}` : 'none',
                      transitionDelay: `${i * 120 + k * 30}ms`,
                    }}
                  />
                )
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

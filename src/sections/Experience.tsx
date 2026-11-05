import { Briefcase } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { portfolio } from '../data/portfolio'

/** Timeline drawn as a vertical bus line with each role as a node. */
export function Experience() {
  return (
    <Section id="experience" index={4} title="Experience">
      <ol className="relative ml-3 border-l border-trace">
        {portfolio.experience.map((e, i) => (
          <li key={e.role + e.org} className="relative mb-10 pl-8 last:mb-0">
            <span className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-signal bg-board">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
            </span>
            <Reveal delay={i * 100}>
              <div className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{e.role}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-signal">
                      <Briefcase className="h-3.5 w-3.5" /> {e.org}
                      {e.location && <span className="text-zinc-500">· {e.location}</span>}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-zinc-500">{e.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-zinc-400">
                      <span className="font-mono text-signal">▹</span> {pt}
                    </li>
                  ))}
                </ul>
                {e.tech && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}

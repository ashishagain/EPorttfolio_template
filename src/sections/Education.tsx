import { GraduationCap } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { portfolio } from '../data/portfolio'

export function Education() {
  return (
    <Section id="education" index={5} title="Education">
      <div className="grid gap-6 md:grid-cols-2">
        {portfolio.education.map((ed, i) => (
          <Reveal key={ed.degree + ed.institution} delay={i * 100}>
            <div className="card h-full p-6">
              <GraduationCap className="mb-4 h-7 w-7 text-copper" />
              <h3 className="text-lg font-semibold text-white">{ed.degree}</h3>
              <p className="text-zinc-400">{ed.institution}</p>
              <div className="mt-2 flex gap-4 font-mono text-xs text-zinc-500">
                <span>{ed.period}</span>
                {ed.score && <span className="text-signal">{ed.score}</span>}
              </div>
              {ed.coursework && (
                <>
                  <p className="mt-5 mb-2 font-mono text-xs text-zinc-500">// relevant coursework</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ed.coursework.map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

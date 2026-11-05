import { Award, BadgeCheck, BookOpen, ExternalLink, Trophy } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { portfolio } from '../data/portfolio'
import type { Achievement } from '../types'

const icons: Record<Achievement['type'], typeof Award> = {
  certification: BadgeCheck,
  award: Award,
  publication: BookOpen,
  hackathon: Trophy,
}

export function Achievements() {
  return (
    <Section id="achievements" index={6} title="Achievements" subtitle="certifications, awards & publications">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.achievements.map((a, i) => {
          const Icon = icons[a.type]
          const body = (
            <div className="card flex h-full items-start gap-4 p-5">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-copper" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{a.title}</h3>
                <p className="text-sm text-zinc-400">{a.issuer}</p>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  {a.type} · {a.date}
                </p>
              </div>
              {a.url && <ExternalLink className="h-4 w-4 text-zinc-500" />}
            </div>
          )
          return (
            <Reveal key={a.title} delay={(i % 3) * 80}>
              {a.url ? (
                <a href={a.url} target="_blank" rel="noreferrer">{body}</a>
              ) : (
                body
              )}
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

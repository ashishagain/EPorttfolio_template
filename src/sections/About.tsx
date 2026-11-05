import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { portfolio } from '../data/portfolio'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'

export function About() {
  const { about } = portfolio
  return (
    <Section id="about" index={1} title="About Me">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-4 text-lg leading-relaxed text-zinc-400">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={150}>
          <div className="card overflow-hidden font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-trace px-4 py-2 text-xs text-zinc-500">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2">datasheet.json</span>
            </div>
            <div className="p-4">
              <span className="text-zinc-500">{'{'}</span>
              {about.specs.map((s, i) => (
                <div key={s.key} className="pl-4">
                  <span className="text-cyan">"{s.key}"</span>
                  <span className="text-zinc-500">: </span>
                  <span className="text-copper">"{s.value}"</span>
                  {i < about.specs.length - 1 && <span className="text-zinc-500">,</span>}
                </div>
              ))}
              <span className="text-zinc-500">{'}'}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {about.stats.map((s, i) => (
          <Stat key={s.label} {...s} delay={i * 100} />
        ))}
      </div>
    </Section>
  )
}

function Stat({ label, value, delay }: { label: string; value: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const display = useCountUp(value, inView)
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="card p-5 text-center">
        {/* seven-segment style readout */}
        <div className="font-mono text-4xl font-bold tracking-widest text-signal [text-shadow:0_0_12px_var(--color-signal)]">
          {display}
        </div>
        <div className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-500">{label}</div>
      </div>
    </Reveal>
  )
}

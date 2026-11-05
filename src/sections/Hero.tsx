import { ArrowDown, Download, MapPin } from 'lucide-react'
import { SocialIcon } from '../components/ui/SocialIcon'
import { portfolio } from '../data/portfolio'
import { useTypewriter } from '../hooks/useTypewriter'

export function Hero() {
  const { profile } = portfolio
  const role = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-16">
      <div className="grid w-full items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          {profile.available && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-xs text-signal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              STATUS: open to opportunities
            </div>
          )}

          <p className="font-mono text-signal">&gt; hello_world();</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-white md:text-7xl">{profile.name}</h1>
          <p className="mt-4 h-8 font-mono text-xl text-zinc-300 md:text-2xl">
            <span className="text-copper">$</span> {role}
            <span className="ml-0.5 inline-block h-6 w-2.5 translate-y-1 animate-blink bg-signal" />
          </p>
          <p className="mt-6 max-w-xl text-lg text-zinc-400">{profile.tagline}</p>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-sm text-zinc-500">
            <MapPin className="h-4 w-4" /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              view_projects()
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download className="btn-ghost">
                <Download className="h-4 w-4" /> resume.pdf
              </a>
            )}
            <a href="#contact" className="btn-ghost">
              contact()
            </a>
          </div>

          <div className="mt-8 flex gap-4">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="text-zinc-500 transition-colors hover:text-signal"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <ChipAvatar />
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-signal" aria-label="Scroll down">
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}

/** Avatar framed as an IC package with pins. Falls back to initials. */
function ChipAvatar() {
  const { name, avatarUrl } = portfolio.profile
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const pins = Array.from({ length: 8 })

  return (
    <div className="relative mx-auto hidden aspect-square w-72 md:block">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <div
          key={side}
          className={`absolute flex justify-around ${
            side === 'top' ? 'inset-x-8 -top-4 h-4'
            : side === 'bottom' ? 'inset-x-8 -bottom-4 h-4'
            : side === 'left' ? 'inset-y-8 -left-4 w-4 flex-col'
            : 'inset-y-8 -right-4 w-4 flex-col'
          }`}
        >
          {pins.map((_, i) => (
            <span
              key={i}
              className={`bg-zinc-500/60 ${side === 'top' || side === 'bottom' ? 'h-full w-1.5' : 'h-1.5 w-full'}`}
              style={{ animation: `pulse 2.4s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      ))}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2 border-zinc-700 bg-gradient-to-br from-zinc-900 to-board shadow-[0_0_60px_-15px_var(--color-signal)]">
        <span className="absolute left-3 top-3 h-3 w-3 rounded-full border border-zinc-600" />
        <span className="absolute bottom-3 right-3 font-mono text-[10px] text-zinc-600">{initials}-MCU-2026</span>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover opacity-90" />
        ) : (
          <span className="font-mono text-7xl font-bold text-signal/80">{initials}</span>
        )}
      </div>
    </div>
  )
}

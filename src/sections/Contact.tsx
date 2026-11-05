import { Check, Copy, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { SocialIcon } from '../components/ui/SocialIcon'
import { portfolio } from '../data/portfolio'

/**
 * Contact form opens the visitor's mail client via mailto:.
 * To send directly instead, swap handleSubmit for a call to Formspree / EmailJS / your own API.
 */
export function Contact() {
  const { email, socials } = portfolio.profile
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })

  const copy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(form.message)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" index={7} title="Get In Touch">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-lg text-zinc-400">
            Whether it's an internship, a collaboration, or just a chat about circuits and code — my inbox is open.
          </p>
          <button onClick={copy} className="btn-ghost mt-6">
            {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
            {email}
          </button>
          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="btn-ghost">
                <SocialIcon icon={s.icon} className="h-4 w-4" /> {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <form onSubmit={handleSubmit} className="card space-y-4 p-6 font-mono text-sm">
            <p className="text-xs text-zinc-500">
              <span className="text-signal">$</span> ./send_message.sh
            </p>
            <label className="block">
              <span className="text-xs text-zinc-500">--name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded border border-trace bg-board px-3 py-2 text-zinc-200 outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="text-xs text-zinc-500">--message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full resize-none rounded border border-trace bg-board px-3 py-2 text-zinc-200 outline-none focus:border-signal"
              />
            </label>
            <button type="submit" className="btn-primary w-full justify-center">
              <Send className="h-4 w-4" /> execute
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

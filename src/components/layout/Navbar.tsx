import { Cpu, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { portfolio } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { NAV_ITEMS } from './navItems'

const ids = NAV_ITEMS.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? 'border-b border-trace bg-board/80 backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm text-white">
          <Cpu className="h-5 w-5 text-signal" />
          <span>
            {portfolio.profile.handle}
            <span className="text-signal">@</span>portfolio
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === item.id ? 'bg-signal/10 text-signal' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ./{item.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="text-zinc-300 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-trace bg-board/95 px-6 py-4 backdrop-blur-md lg:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 font-mono text-sm ${active === item.id ? 'text-signal' : 'text-zinc-400'}`}
              >
                ./{item.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* scroll progress "signal" */}
      <div className="absolute bottom-0 left-0 h-px bg-signal shadow-[0_0_8px_var(--color-signal)]" style={{ width: `${progress}%` }} />
    </header>
  )
}

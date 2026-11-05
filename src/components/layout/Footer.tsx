import { portfolio } from '../../data/portfolio'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-trace py-8 text-center font-mono text-xs text-zinc-500">
      <p>
        © {YEAR} {portfolio.profile.name} · built with React + TypeScript + Tailwind
      </p>
      <p className="mt-1 text-zinc-600">[ EOF ]</p>
    </footer>
  )
}

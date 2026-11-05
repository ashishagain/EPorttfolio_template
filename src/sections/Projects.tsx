import { ExternalLink, FolderGit2, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { SocialIcon } from '../components/ui/SocialIcon'
import { portfolio } from '../data/portfolio'
import type { Project, ProjectCategory } from '../types'

type Filter = 'all' | ProjectCategory

const categoryColor: Record<ProjectCategory, string> = {
  software: 'text-signal border-signal/40',
  embedded: 'text-cyan border-cyan/40',
  hardware: 'text-copper border-copper/40',
  research: 'text-violet-400 border-violet-400/40',
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)

  const categories: Filter[] = ['all', ...new Set(portfolio.projects.map((p) => p.category))]
  const q = query.trim().toLowerCase()
  const projects = portfolio.projects
    .filter((p) => filter === 'all' || p.category === filter)
    .filter((p) => !q || [p.title, p.summary, ...p.tech].some((s) => s.toLowerCase().includes(q)))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))

  return (
    <Section id="projects" index={3} title="Projects" subtitle="click a card for details">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded border px-3 py-1.5 font-mono text-xs capitalize transition-colors ${
                filter === c ? 'border-signal bg-signal/10 text-signal' : 'border-trace text-zinc-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded border border-trace bg-board px-3 py-1.5 font-mono text-xs focus-within:border-signal">
          <span className="text-signal">grep</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search tech or title..."
            className="w-48 bg-transparent text-zinc-200 outline-none placeholder:text-zinc-600"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 100}>
            <ProjectCard project={p} onOpen={() => setSelected(p)} />
          </Reveal>
        ))}
      </div>
      {projects.length === 0 && (
        <p className="py-12 text-center font-mono text-sm text-zinc-500">0 matches found. exit code 1.</p>
      )}

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}

function ProjectCard({ project: p, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="card group flex h-full w-full flex-col overflow-hidden text-left hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_var(--color-signal)]"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-trace bg-board">
        {p.image ? (
          <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(var(--color-trace)_1px,transparent_1px),linear-gradient(90deg,var(--color-trace)_1px,transparent_1px)] bg-[size:20px_20px]">
            <FolderGit2 className="h-10 w-10 text-zinc-600 transition-colors group-hover:text-signal" />
          </div>
        )}
        {p.featured && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-board/90 px-2 py-0.5 font-mono text-[10px] text-copper">
            <Star className="h-3 w-3 fill-current" /> featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase ${categoryColor[p.category]}`}>
            {p.category}
          </span>
          {p.year && <span className="font-mono text-xs text-zinc-600">{p.year}</span>}
        </div>
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-signal">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm text-zinc-400">{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </button>
  )
}

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-trace bg-board-2 px-5 py-3 font-mono text-xs text-zinc-500">
          <span>~/projects/{p.id}</span>
          <button onClick={onClose} aria-label="Close" className="hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        {p.image && <img src={p.image} alt={p.title} className="w-full border-b border-trace" />}
        <div className="p-6">
          <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase ${categoryColor[p.category]}`}>
            {p.category}
          </span>
          <h3 className="mt-3 text-2xl font-bold text-white">{p.title}</h3>
          <p className="mt-3 text-zinc-400">{p.description ?? p.summary}</p>

          {p.highlights && p.highlights.length > 0 && (
            <ul className="mt-5 space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-zinc-300">
                  <span className="font-mono text-signal">▹</span> {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            {p.repoUrl && (
              <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                <SocialIcon icon="github" className="h-4 w-4" /> source
              </a>
            )}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <ExternalLink className="h-4 w-4" /> live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

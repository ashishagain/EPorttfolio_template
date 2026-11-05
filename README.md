# Portfolio — CS & Electronics

React + TypeScript + Tailwind CSS v4 (Vite).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Filling in your info
All content lives in **`src/data/portfolio.ts`** (types in `src/types/index.ts`).
Put images / resume in `public/` and reference them as `/avatar.jpg`, `/resume.pdf`, `/projects/foo.jpg`.

## Structure
```
src/
  data/portfolio.ts        ← your content
  types/                   ← data shapes
  hooks/                   ← typewriter, in-view, active-section, count-up
  components/
    background/            ← animated PCB trace canvas
    layout/                ← Navbar (scroll progress, active link), Footer
    ui/                    ← Section, Reveal, SocialIcon
  sections/                ← Hero, About, Skills, Projects, Experience, Education, Achievements, Contact
```
To add or remove a section, edit `src/App.tsx` and `src/components/layout/navItems.ts`.
Theme colours are in `src/index.css` under `@theme`.

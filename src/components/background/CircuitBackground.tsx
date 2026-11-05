import { useEffect, useRef } from 'react'

/**
 * Animated PCB-style background: a grid of right-angle copper traces
 * with glowing "signal" pulses travelling along them. Reacts to the mouse.
 */
interface Trace {
  points: { x: number; y: number }[]
  length: number
  color: string
}
interface Pulse {
  trace: Trace
  t: number
  speed: number
}

const GRID = 40

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let traces: Trace[] = []
    let pulses: Pulse[] = []
    let raf = 0
    const mouse = { x: -1000, y: -1000 }

    const build = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(window.innerWidth / GRID)
      const rows = Math.ceil(window.innerHeight / GRID)
      const count = Math.floor((cols * rows) / 18)
      traces = Array.from({ length: count }, () => {
        let x = Math.floor(Math.random() * cols) * GRID
        let y = Math.floor(Math.random() * rows) * GRID
        const pts = [{ x, y }]
        let dir = Math.floor(Math.random() * 4)
        const segs = 2 + Math.floor(Math.random() * 4)
        for (let i = 0; i < segs; i++) {
          const len = (1 + Math.floor(Math.random() * 4)) * GRID
          if (dir === 0) x += len
          else if (dir === 1) y += len
          else if (dir === 2) x -= len
          else y -= len
          pts.push({ x, y })
          dir = (dir + (Math.random() < 0.5 ? 1 : 3)) % 4 // turn 90°
        }
        let length = 0
        for (let i = 1; i < pts.length; i++)
          length += Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y)
        return { points: pts, length, color: Math.random() < 0.75 ? '52,211,153' : '245,158,11' }
      })
      pulses = traces
        .filter(() => Math.random() < 0.35)
        .map((trace) => ({ trace, t: Math.random(), speed: 0.6 + Math.random() * 1.2 }))
    }

    const pointAt = (tr: Trace, t: number) => {
      let d = t * tr.length
      for (let i = 1; i < tr.points.length; i++) {
        const a = tr.points[i - 1]
        const b = tr.points[i]
        const seg = Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
        if (d <= seg) {
          const k = seg === 0 ? 0 : d / seg
          return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
        }
        d -= seg
      }
      return tr.points[tr.points.length - 1]
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // traces + pads
      for (const tr of traces) {
        const end = tr.points[tr.points.length - 1]
        const near = Math.hypot(end.x - mouse.x, end.y - mouse.y) < 160
        ctx.strokeStyle = near ? `rgba(${tr.color},0.35)` : 'rgba(27,43,38,0.9)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        tr.points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
        ctx.stroke()
        for (const p of [tr.points[0], end]) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
          ctx.strokeStyle = near ? `rgba(${tr.color},0.6)` : 'rgba(27,43,38,1)'
          ctx.stroke()
        }
      }

      // signal pulses
      for (const p of pulses) {
        p.t += (p.speed * 0.6) / p.trace.length
        if (p.t > 1) p.t = 0
        const { x, y } = pointAt(p.trace, p.t)
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10)
        g.addColorStop(0, `rgba(${p.trace.color},0.9)`)
        g.addColorStop(1, `rgba(${p.trace.color},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (reduceMotion) draw()
    }
    const onResize = () => {
      build()
      if (reduceMotion) draw()
    }

    build()
    draw()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 opacity-70" aria-hidden />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-board)_75%)]" />
    </>
  )
}

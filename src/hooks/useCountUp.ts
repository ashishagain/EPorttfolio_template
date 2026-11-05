import { useEffect, useState } from 'react'

/** Animates numeric strings (e.g. "12", "3+") from 0 when `start` becomes true. Non-numeric values pass through. */
export function useCountUp(value: string, start: boolean, duration = 1200) {
  const match = value.match(/^(\d+)(.*)$/)
  const [display, setDisplay] = useState(match ? '0' + match[2] : value)

  useEffect(() => {
    if (!match || !start) return
    const target = parseInt(match[1], 10)
    const pad = match[1].length
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const n = Math.round(target * (1 - Math.pow(1 - p, 3)))
      setDisplay(String(n).padStart(pad, '0') + match[2])
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, start, duration])

  return match ? display : value
}

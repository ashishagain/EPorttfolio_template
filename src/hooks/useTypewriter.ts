import { useEffect, useState } from 'react'

/** Cycles through words, typing and deleting each one. */
export function useTypewriter(words: string[], typeMs = 80, deleteMs = 40, holdMs = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return
    const word = words[index % words.length]
    let delay = deleting ? deleteMs : typeMs
    if (!deleting && text === word) delay = holdMs

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

  return text
}

import { useEffect, useState } from 'react'
import { site } from '../data/content'
import { asset } from '../lib/asset'

const LINKS = [
  ['flying', 'Flying'],
  ['builds', 'Builds'],
  ['engineering', 'Engineering'],
  ['work', 'Work'],
  ['toolkit', 'Toolkit'],
  ['contact', 'Contact'],
]

export default function Nav({ go }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <a className="nav-mark" href="#top" onClick={go('top')}>
        {site.short}
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="nav-links" className="nav-links" aria-label="Sections">
        {LINKS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              setOpen(false)
              go(id)(e)
            }}
          >
            {label}
          </a>
        ))}
        <a className="nav-resume" href={asset(site.resume)} download="Min-Naing_Akamatsu_Resume.pdf">
          Resume
        </a>
      </nav>
    </header>
  )
}

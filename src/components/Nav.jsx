import { useEffect, useState } from 'react'
import { site } from '../data/content'
import { PAGES } from '../data/routes'
import { asset } from '../lib/asset'

export default function Nav({ link, route }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Over the home hero the bar stays clear until you scroll; every other page starts solid
    const onScroll = () => setSolid(route !== '' || window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [route])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <a className="nav-mark" {...link('')} aria-current={undefined}>
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
      <nav id="nav-links" className="nav-links" aria-label="Pages">
        {PAGES.map(({ id, label }) => {
          const props = link(id)
          return (
            <a
              key={id}
              {...props}
              onClick={(e) => {
                setOpen(false)
                props.onClick(e)
              }}
            >
              {label}
            </a>
          )
        })}
        <a className="nav-resume" href={asset(site.resume)} download="Min-Naing_Akamatsu_Resume.pdf">
          Resume
        </a>
      </nav>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { site } from '../data/content'
import { SECTIONS } from '../data/routes'
import { asset } from '../lib/asset'

export default function Nav({ link, route }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const home = route.page === 'home'

  useEffect(() => {
    // Over the home hero the bar stays clear until you scroll; project pages start solid
    const onScroll = () => setSolid(!home || window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [home])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = (props) => ({
    ...props,
    onClick: (e) => {
      setOpen(false)
      props.onClick(e)
    },
  })

  return (
    <header className={`nav${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <a className="nav-mark" {...close(link({ page: 'home' }))}>
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
        {SECTIONS.map(([id, label]) => (
          <a
            key={id}
            {...close(link({ page: 'home', section: id }))}
            aria-current={id === 'work' && !home ? 'page' : undefined}
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

import { useCallback, useEffect, useRef, useState } from 'react'
import Boot from './components/Boot'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Channels from './components/Channels'
import Flying from './components/Flying'
import Builds from './components/Builds'
import Engineering from './components/Engineering'
import CadGallery from './components/CadGallery'
import Work from './components/Work'
import Toolkit from './components/Toolkit'
import Record from './components/Record'
import OffDuty from './components/OffDuty'
import Contact from './components/Contact'
import PageCta from './components/PageCta'
import Footer from './components/Footer'
import { ROUTES, pageTitle } from './data/routes'
import { hrefFor, pushRoute, readRoute, routeEvent } from './lib/router'
import { arm, prefersReducedMotion } from './lib/flight'

const BOOT_KEY = 'min-site-booted'

function shouldBoot() {
  if (prefersReducedMotion()) return false
  if (readRoute() !== '') return false // only the home page boots up
  try {
    return !sessionStorage.getItem(BOOT_KEY)
  } catch {
    return true
  }
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot)
  const [route, setRoute] = useState(readRoute)
  const [cut, setCut] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    if (!booting) arm(250)
  }, [booting])

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* private mode, fine */
    }
    arm(0)
    setBooting(false)
  }, [])

  // Browser back and forward
  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener(routeEvent, onChange)
    return () => window.removeEventListener(routeEvent, onChange)
  }, [])

  useEffect(() => {
    const r = ROUTES.find((x) => x.id === route)
    document.title = pageTitle(r)
  }, [route])

  // Changing pages cuts through a burst of static, like switching video channels
  const navigate = useCallback(
    (id) => {
      const swap = () => {
        if (id !== readRoute()) pushRoute(id)
        setRoute(id)
        window.scrollTo(0, 0)
        mainRef.current?.focus({ preventScroll: true })
      }
      if (prefersReducedMotion()) return swap()
      setCut(true)
      setTimeout(swap, 70)
      setTimeout(() => setCut(false), 200)
    },
    [],
  )

  // Props for any internal link: real href (open in new tab still works) plus the static cut
  const link = useCallback(
    (id) => ({
      href: hrefFor(id),
      'aria-current': id === route ? 'page' : undefined,
      onClick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
        e.preventDefault()
        navigate(id)
      },
    }),
    [navigate, route],
  )

  return (
    <>
      {booting && <Boot onDone={finishBoot} />}
      {cut && <div className="cut static" aria-hidden="true" />}
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav link={link} route={route} />
      <main id="main" ref={mainRef} tabIndex={-1} className={`page page-${route || 'home'}`}>
        {route === '' && (
          <>
            <Hero link={link} />
            <Channels link={link} />
          </>
        )}
        {route === 'flying' && <Flying />}
        {route === 'builds' && <Builds />}
        {route === 'engineering' && (
          <>
            <Engineering />
            <CadGallery />
          </>
        )}
        {route === 'experience' && (
          <>
            <Work />
            <Record />
          </>
        )}
        {route === 'about' && (
          <>
            <Toolkit />
            <OffDuty />
          </>
        )}
        {route === 'contact' && <Contact />}
        <PageCta route={route} link={link} />
      </main>
      <Footer />
    </>
  )
}

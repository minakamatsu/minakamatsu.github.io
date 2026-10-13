import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Boot from './components/Boot'
import Nav from './components/Nav'
import Hero from './components/Hero'
import WorkIndex from './components/WorkIndex'
import CadGallery from './components/CadGallery'
import Flying from './components/Flying'
import Work from './components/Work'
import Toolkit from './components/Toolkit'
import Record from './components/Record'
import OffDuty from './components/OffDuty'
import Contact from './components/Contact'
import ProjectPage from './components/ProjectPage'
import Footer from './components/Footer'
import { HOME_TITLE, projectBySlug, projectTitle } from './data/routes'
import { hrefFor, pushRoute, readRoute, replaceRoute, routeEvent, sameRoute } from './lib/router'
import { arm, prefersReducedMotion } from './lib/flight'

const BOOT_KEY = 'min-site-booted'

function shouldBoot() {
  if (prefersReducedMotion()) return false
  const r = readRoute()
  if (r.page !== 'home' || r.section) return false // only a fresh visit to the home page boots up
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
  const pendingSection = useRef(route.section || null)
  const mainRef = useRef(null)
  const routeRef = useRef(route)
  routeRef.current = route

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

  // An old address like /engineering/ becomes /#work
  useEffect(() => {
    if (route.legacy) replaceRoute({ page: 'home', section: route.section })
  }, [route])

  // Browser back and forward (and the hash change our own navigation causes in the preview build)
  useEffect(() => {
    const onChange = () => {
      const r = readRoute()
      if (sameRoute(routeRef.current, r)) return
      pendingSection.current = r.section || null
      setRoute(r)
    }
    window.addEventListener(routeEvent, onChange)
    return () => window.removeEventListener(routeEvent, onChange)
  }, [])

  // After a page renders, land on the requested section or the top
  useLayoutEffect(() => {
    const id = pendingSection.current
    pendingSection.current = null
    if (id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        el.focus({ preventScroll: true })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [route])

  useEffect(() => {
    const p = route.page === 'project' ? projectBySlug(route.slug) : null
    document.title = p ? projectTitle(p) : HOME_TITLE
  }, [route])

  // Every jump cuts through a burst of static, like switching video channels
  const navigate = useCallback(
    (target) => {
      const go = () => {
        if (target.page === 'home' && route.page === 'home') {
          // Same page: just jump to the section
          const el = target.section && document.getElementById(target.section)
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' })
            el.focus({ preventScroll: true })
          } else {
            window.scrollTo(0, 0)
          }
          replaceRoute(target)
          return
        }
        const next = { page: target.page, slug: target.slug, section: target.section }
        routeRef.current = next // so the hash change this push causes isn't mistaken for back/forward
        pendingSection.current = target.section || null
        pushRoute(target)
        setRoute(next)
        if (!target.section) mainRef.current?.focus({ preventScroll: true })
      }
      if (prefersReducedMotion()) return go()
      setCut(true)
      setTimeout(go, 70)
      setTimeout(() => setCut(false), 200)
    },
    [route],
  )

  // Props for any internal link: a real href (so open-in-new-tab works) plus the static cut
  const link = useCallback(
    (target) => ({
      href: hrefFor(target),
      'aria-current': target.page === 'project' && sameRoute(target, route) ? 'page' : undefined,
      onClick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
        e.preventDefault()
        navigate(target)
      },
    }),
    [navigate, route],
  )

  const home = route.page === 'home'

  return (
    <>
      {booting && <Boot onDone={finishBoot} />}
      {cut && <div className="cut static" aria-hidden="true" />}
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav link={link} route={route} />
      <main id="main" ref={mainRef} tabIndex={-1} className={`page page-${home ? 'home' : 'project'}`}>
        {home ? (
          <>
            <Hero link={link} />
            <WorkIndex link={link} />
            <CadGallery />
            <Flying />
            <Work />
            <Toolkit />
            <Record />
            <OffDuty />
            <Contact />
          </>
        ) : (
          <ProjectPage key={route.slug} slug={route.slug} link={link} />
        )}
      </main>
      <Footer />
    </>
  )
}

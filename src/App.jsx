import { useCallback, useEffect, useState } from 'react'
import Boot from './components/Boot'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Flying from './components/Flying'
import Builds from './components/Builds'
import Research from './components/Research'
import CadGallery from './components/CadGallery'
import Work from './components/Work'
import Toolkit from './components/Toolkit'
import Record from './components/Record'
import OffDuty from './components/OffDuty'
import Contact from './components/Contact'
import { arm, prefersReducedMotion } from './lib/flight'

const BOOT_KEY = 'min-site-booted'

function shouldBoot() {
  if (prefersReducedMotion()) return false
  try {
    return !sessionStorage.getItem(BOOT_KEY)
  } catch {
    return true
  }
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot)
  const [cut, setCut] = useState(false)

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

  // Nav jumps cut through a burst of static, like switching video channels
  const go = useCallback(
    (id) => (e) => {
      const el = document.getElementById(id)
      if (!el) return
      e?.preventDefault()
      const jump = () => {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`)
        if (id !== 'top') el.focus({ preventScroll: true })
      }
      if (prefersReducedMotion()) return jump()
      setCut(true)
      setTimeout(jump, 70)
      setTimeout(() => setCut(false), 200)
    },
    [],
  )

  return (
    <>
      {booting && <Boot onDone={finishBoot} />}
      {cut && <div className="cut static" aria-hidden="true" />}
      <a className="skip" href="#flying">
        Skip to content
      </a>
      <Nav go={go} />
      <main>
        <Hero go={go} />
        <Flying />
        <Builds />
        <Research />
        <CadGallery />
        <Work />
        <Toolkit />
        <Record />
        <OffDuty />
        <Contact />
      </main>
    </>
  )
}

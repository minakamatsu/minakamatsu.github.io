import { useEffect, useRef } from 'react'
import { flight, prefersReducedMotion } from '../lib/flight'
import { site } from '../data/content'

const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt))
const pad2 = (n) => String(n).padStart(2, '0')

export default function OsdOverlay() {
  const volt = useRef()
  const cells = useRef()
  const mah = useRef()
  const mode = useRef()
  const rssi = useRef()
  const alt = useRef()
  const spd = useRef()
  const timer = useRef()
  const home = useRef()
  const homeArrow = useRef()
  const ahi = useRef()

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const start = performance.now()
    let last = start
    let lastY = window.scrollY
    let speed = 0
    let roll = 0
    let pitch = 0
    let heading = 0
    let used = 0
    let raf
    const set = (ref, text) => {
      if (ref.current && ref.current.textContent !== text) ref.current.textContent = text
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      const y = window.scrollY
      if (y > window.innerHeight * 1.3) {
        lastY = y
        return
      }
      const t = (now - start) / 1000
      const armedFor = flight.armedAt ? (now - flight.armedAt) / 1000 : -1

      // speed from scroll velocity, plus a little hover drift
      const vel = Math.abs(y - lastY) / Math.max(dt, 0.001)
      lastY = y
      const hoverDrift = armedFor > 0 ? 6 + Math.sin(t * 0.9) * 2 : 0
      speed = damp(speed, Math.min(140, vel * 0.09) + hoverDrift, 3, dt)

      // 6S pack: starts full and sags under load
      used += dt * (armedFor > 0 ? 1.3 + speed * 0.05 : 0.05)
      const v = Math.max(22.2, 25.2 - used * 0.0022 - speed * 0.006 + Math.sin(t * 7) * 0.01)
      set(volt, `${v.toFixed(1)}V`)
      set(mah, `${Math.round(used * 3)}MAH`)
      if (cells.current) {
        const frac = (v - 22.2) / 3
        const lit = Math.max(1, Math.ceil(frac * 5))
        const kids = cells.current.children
        for (let i = 0; i < kids.length; i++) kids[i].classList.toggle('on', i < lit)
      }

      set(mode, armedFor < 0 ? 'DISARMED' : armedFor < 1.6 ? 'ARMED' : 'ACRO')
      if (mode.current) mode.current.classList.toggle('is-armed', armedFor >= 0 && armedFor < 1.6)

      const r = 97 + Math.round((Math.sin(t * 1.3) + 1) * 1)
      set(rssi, `RSSI ${r}`)

      const altitude = (armedFor > 0 ? Math.min(1, armedFor / 1.2) * 3.4 : 0) + y * 0.02
      set(alt, `ALT ${altitude.toFixed(1)}M`)
      set(spd, `${Math.round(speed)} KM/H`)
      set(timer, `${pad2(Math.floor(t / 60))}:${pad2(Math.floor(t % 60))}`)
      set(home, `${Math.round(8 + y * 0.05)}M`)

      // attitude follows the pointer the same way the 3D quad does
      const idle = reduced ? 0 : Math.sin(t * 0.7) * 0.05
      roll = damp(roll, reduced ? 0 : -flight.px * 0.32 + idle, 4, dt)
      pitch = damp(pitch, reduced ? 0 : flight.py * 0.14, 4, dt)
      heading = damp(heading, flight.px * 50, 3, dt)
      if (ahi.current) {
        ahi.current.style.transform = `translateY(${(pitch * 160).toFixed(1)}px) rotate(${((-roll * 180) / Math.PI).toFixed(2)}deg)`
      }
      if (homeArrow.current) homeArrow.current.style.transform = `rotate(${heading.toFixed(1)}deg)`
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="osd" aria-hidden="true">
      <div className="osd-item osd-tl">
        <div className="osd-row">
          <span className="osd-batt" ref={cells}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span ref={volt}>25.2V</span>
        </div>
        <div ref={mah}>0MAH</div>
      </div>

      <div className="osd-item osd-tc" ref={mode}>
        DISARMED
      </div>

      <div className="osd-item osd-tr">
        <div ref={rssi}>RSSI 99</div>
        <div>LQ 100</div>
        <div className="osd-dim">R1 5658</div>
      </div>

      <div className="osd-center">
        <div className="osd-ahi" ref={ahi}>
          <span className="ahi-line ahi-l" />
          <span className="ahi-line ahi-r" />
          <span className="ahi-rung ahi-up" />
          <span className="ahi-rung ahi-down" />
        </div>
        <span className="osd-cross" />
      </div>

      <div className="osd-item osd-mr">
        <div ref={alt}>ALT 0.0M</div>
        <div ref={spd}>0 KM/H</div>
      </div>

      <div className="osd-item osd-bl" ref={timer}>
        00:00
      </div>
      <div className="osd-item osd-bc">{site.callsign}</div>
      <div className="osd-item osd-br">
        <span className="osd-home" ref={homeArrow}>
          <svg viewBox="0 0 10 12" width="10" height="12">
            <path d="M5 0 L10 12 L5 9 L0 12 Z" fill="currentColor" />
          </svg>
        </span>
        <span ref={home}>8M</span>
      </div>
    </div>
  )
}

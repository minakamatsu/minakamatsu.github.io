import { useEffect, useRef, useState } from 'react'

// Goggles power on: static, the video link locks, the quad arms. About one second.
const LINES = ['RX LINK OK', 'VTX R1 5658 MHZ', 'OSD READY']

export default function Boot({ onDone }) {
  const [step, setStep] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (done.current) return
      done.current = true
      onDone()
    }
    const timers = [
      setTimeout(() => setStep(1), 360),
      setTimeout(() => setStep(2), 490),
      setTimeout(() => setStep(3), 620),
      setTimeout(() => setStep(4), 800),
      setTimeout(finish, 1100),
    ]
    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
  }, [onDone])

  return (
    <div className="boot" aria-hidden="true">
      <div className={`boot-static static${step > 0 ? ' is-locked' : ''}`} />
      <div className="boot-lines">
        {LINES.slice(0, Math.min(step, 3)).map((l) => (
          <p key={l}>{l}</p>
        ))}
        {step >= 4 && <p className="boot-armed">ARMED</p>}
      </div>
    </div>
  )
}

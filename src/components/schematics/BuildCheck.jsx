import { useEffect, useState } from 'react'
import { useLive } from './useLive'

// What the compatibility engine does, run on an example build.
// 100 points, minus 25 per error, 10 per warning, 3 per note.
const ROWS = [
  ['Frame / stack', '30.5 mm', 'ok'],
  ['Batt / stack', '6S of 8S', 'ok'],
  ['Batt / motor', '6S 2450KV', 'warn'],
  ['Video chain', 'one system', 'ok'],
  ['Prop / frame', '5.1 on 5"', 'ok'],
  ['Receiver', 'empty', 'info'],
]
const COST = { ok: 0, info: 3, warn: 10, error: 25 }
const LABEL = { ok: 'OK', info: 'NOTE', warn: 'WARN', error: 'ERR' }

export default function BuildCheck() {
  const [ref, live] = useLive()
  const [shown, setShown] = useState(ROWS.length)

  useEffect(() => {
    if (!live) {
      setShown(ROWS.length)
      return
    }
    setShown(0)
    let n = 0
    const id = setInterval(() => {
      n += 1
      setShown(n)
      if (n >= ROWS.length) clearInterval(id)
    }, 260)
    return () => clearInterval(id)
  }, [live])

  const score = 100 - ROWS.slice(0, shown).reduce((s, r) => s + COST[r[2]], 0)
  const done = shown >= ROWS.length

  return (
    <div ref={ref} className="bc" role="img" aria-label="Example compatibility check: five checks pass, one high-KV warning and one empty slot, score 87 out of 100">
      <p className="bc-head">
        <span>Build check</span>
        <span>Example</span>
      </p>
      <ul className="bc-rows" aria-hidden="true">
        {ROWS.map(([k, v, st], i) => (
          <li key={k} className={i < shown ? `bc-${st}` : 'bc-pending'}>
            <span className="bc-k">{k}</span>
            <span className="bc-v">{v}</span>
            <span className="bc-st">{i < shown ? LABEL[st] : '...'}</span>
          </li>
        ))}
      </ul>
      <div className="bc-score" aria-hidden="true">
        <span>Score</span>
        <strong className={done ? 'is-done' : ''}>{score}</strong>
        <span>/100</span>
      </div>
      <p className="bc-foot" aria-hidden="true">
        -10 warn &nbsp; -3 note
      </p>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useLive } from './useLive'

// Top views of the quad sizes the team builds, roughly to scale:
// typical motor-to-motor diagonal and prop size for each class.
const PX = 5.4 // pixels per inch
const QUADS = [
  { label: 'Whoop', diag: 2.56, prop: 1.6, ducted: true },
  { label: '3"', diag: 5.1, prop: 3 },
  { label: '5"', diag: 8.7, prop: 5 },
  { label: '7"', diag: 11.8, prop: 7 },
]
const GAP = 9
const CY = 108

const layout = (() => {
  let x = 12
  return QUADS.map((q) => {
    const spread = (q.diag / Math.SQRT2) * PX
    const r = (q.prop / 2) * PX
    const w = spread + 2 * r
    const cx = x + w / 2
    x += w + GAP
    return { ...q, cx, half: spread / 2, r }
  })
})()

export default function QuadSizesSchematic() {
  const [ref, live] = useLive()
  const [i, setI] = useState(3)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setI((n) => (n + 1) % QUADS.length), 900)
    return () => clearInterval(id)
  }, [live])

  return (
    <svg ref={ref} className="schem" viewBox="0 30 240 180" role="img" aria-label="Top views of a whoop, a 3 inch, a 5 inch and a 7 inch quad, roughly to scale">
      {layout.map((q, k) => {
        const on = k === i
        const motors = [
          [q.cx - q.half, CY - q.half],
          [q.cx + q.half, CY - q.half],
          [q.cx - q.half, CY + q.half],
          [q.cx + q.half, CY + q.half],
        ]
        return (
          <g key={q.label}>
            <line x1={motors[0][0]} y1={motors[0][1]} x2={motors[3][0]} y2={motors[3][1]} className="s-line" />
            <line x1={motors[1][0]} y1={motors[1][1]} x2={motors[2][0]} y2={motors[2][1]} className="s-line" />
            <rect x={q.cx - 2.5 - q.half * 0.18} y={CY - 4 - q.half * 0.25} width={5 + q.half * 0.36} height={8 + q.half * 0.5} rx="1.5" className="s-joint" />
            {motors.map(([mx, my]) => (
              <g key={`${mx}-${my}`}>
                <circle cx={mx} cy={my} r={q.r} className={on ? 's-prop-on' : q.ducted ? 's-line' : 's-faint'} />
                <circle cx={mx} cy={my} r={Math.max(1.4, q.r * 0.16)} className="s-joint" />
              </g>
            ))}
            <text x={q.cx} y={CY + 64} textAnchor="middle" className={on ? 's-size s-size-on' : 's-size'}>
              {q.label}
            </text>
          </g>
        )
      })}
      <g className="s-label">
        <text x="120" y="198" textAnchor="middle">Whoops to 7 inch, roughly to scale</text>
      </g>
    </svg>
  )
}

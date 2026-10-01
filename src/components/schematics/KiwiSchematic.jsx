import { useEffect, useRef, useState } from 'react'
import { useLive } from './useLive'

// Top view of a kiwi drive: three omni wheels 120 degrees apart.
// For a target direction, each wheel's speed is the target vector dotted with
// the direction that wheel rolls. The arrows are computed, not drawn by hand.
const C = { x: 120, y: 112 }
const R = 74
const WHEELS = [90, 210, 330].map((deg) => {
  const a = (deg * Math.PI) / 180
  return {
    deg,
    x: C.x + R * Math.cos(a),
    y: C.y - R * Math.sin(a),
    tx: -Math.sin(a),
    ty: Math.cos(a),
  }
})

export default function KiwiSchematic() {
  const [ref, live] = useLive()
  const [phi, setPhi] = useState(0.6)
  const raf = useRef(0)

  useEffect(() => {
    if (!live) return
    let last = performance.now()
    const tick = (now) => {
      setPhi((p) => p + (now - last) * 0.0007)
      last = now
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [live])

  const vx = Math.cos(phi)
  const vy = Math.sin(phi)
  const tri = WHEELS.map((w) => `${C.x + (R - 16) * Math.cos((w.deg * Math.PI) / 180)},${C.y - (R - 16) * Math.sin((w.deg * Math.PI) / 180)}`).join(' ')

  return (
    <svg ref={ref} className="schem" viewBox="0 6 240 222" role="img" aria-label="Top view of a three-wheel kiwi drive. As the target direction turns, each omni wheel's speed changes to add up to that motion.">
      <defs>
        <marker id="kw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" className="s-mark-fb" />
        </marker>
        <marker id="kw-arrow-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" className="s-mark-cmd" />
        </marker>
      </defs>
      <polygon points={tri} className="s-line" />
      {WHEELS.map((w) => {
        const s = vx * w.tx + vy * w.ty
        const len = 32 * s
        // run the arrow just outside the wheel so it doesn't sit on top of it
        const ox = w.x + ((w.x - C.x) / R) * 12
        const oy = w.y + ((w.y - C.y) / R) * 12
        const ex = ox + w.tx * len
        const ey = oy - w.ty * len
        const rot = -(w.deg + 90)
        return (
          <g key={w.deg}>
            <rect x={w.x - 16} y={w.y - 6} width="32" height="12" rx="3" className="s-line" transform={`rotate(${rot} ${w.x} ${w.y})`} />
            {Math.abs(len) > 3 && (
              <line x1={ox} y1={oy} x2={ex} y2={ey} className="s-wheel-v" markerEnd="url(#kw-arrow-w)" />
            )}
          </g>
        )
      })}
      <line x1={C.x} y1={C.y} x2={C.x + vx * 38} y2={C.y - vy * 38} className="s-target" markerEnd="url(#kw-arrow)" />
      <circle cx={C.x} cy={C.y} r="2.5" className="s-joint" />
      <g className="s-label">
        <text x="120" y="206" textAnchor="middle">Wheel speed = target · roll direction</text>
        <text x="120" y="222" textAnchor="middle" className="s-label-dim">Kiwi drive, three omni wheels at 120°</text>
      </g>
    </svg>
  )
}

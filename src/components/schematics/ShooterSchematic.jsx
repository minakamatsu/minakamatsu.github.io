import { useEffect, useState } from 'react'
import { useLive } from './useLive'

// Side view of the FTC shooter: flywheel under a rigid outer hood, with a
// free inner hood that sets the launch angle. Same exit speed, three angles,
// three distances. Trajectories are real projectile arcs.
const E = { x: 74, y: 146 }
const SHOTS = [
  { angle: 80, goalX: 130.6, points: '74.0 146.0 76.4 133.1 78.7 121.1 81.1 110.1 83.4 100.0 85.8 90.9 88.1 82.7 90.5 75.4 92.9 69.1 95.2 63.7 97.6 59.3 99.9 55.8 102.3 53.3 104.7 51.6 107.0 51.0 109.4 51.2 111.7 52.5 114.1 54.6 116.4 57.7 118.8 61.7 121.2 66.7 123.5 72.6 125.9 79.5 128.2 87.3 130.6 96.0' },
  { angle: 70, goalX: 177.9, points: '74.0 146.0 78.3 134.5 82.7 123.8 87.0 114.0 91.3 105.0 95.7 96.7 100.0 89.3 104.3 82.8 108.6 77.0 113.0 72.0 117.3 67.9 121.6 64.6 126.0 62.1 130.3 60.4 134.6 59.6 139.0 59.5 143.3 60.3 147.6 61.9 151.9 64.3 156.3 67.6 160.6 71.6 164.9 76.5 169.3 82.2 173.6 88.7 177.9 96.0' },
  { angle: 55, goalX: 211.2, points: '74.0 146.0 79.7 138.1 85.4 130.7 91.1 123.8 96.9 117.4 102.6 111.5 108.3 106.1 114.0 101.3 119.7 96.9 125.4 93.1 131.2 89.7 136.9 86.9 142.6 84.5 148.3 82.7 154.0 81.4 159.7 80.6 165.4 80.2 171.2 80.4 176.9 81.1 182.6 82.4 188.3 84.1 194.0 86.3 199.7 89.0 205.5 92.3 211.2 96.0' },
]
const GOAL_Y = 96

export default function ShooterSchematic() {
  const [ref, live] = useLive()
  const [i, setI] = useState(1)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setI((n) => (n + 1) % SHOTS.length), 1300)
    return () => clearInterval(id)
  }, [live])

  const s = SHOTS[i]
  return (
    <svg ref={ref} className="schem" viewBox="10 26 226 196" role="img" aria-label="Side view of a robot shooter: a flywheel under a rigid outer hood, with an inner hood that changes the launch angle so the same shot reaches goals at three distances">
      <line x1="14" y1="200" x2="232" y2="200" className="s-faint" />
      <rect x="24" y="166" width="74" height="24" rx="3" className="s-line" />
      <circle cx="36" cy="194" r="6" className="s-line" />
      <circle cx="86" cy="194" r="6" className="s-line" />
      <circle cx="56" cy="152" r="13" className="s-line" />
      <circle cx="56" cy="152" r="2.5" className="s-joint" />
      <path d="M36 160 A 24 24 0 0 1 72 132" className="s-line s-hood" />
      {SHOTS.map((sh, k) => (
        <g key={sh.angle}>
          <polyline
            points={sh.points}
            className={k === i ? `s-fb${live ? ' is-live' : ''}` : 's-faint s-arc'}
          />
          <path
            d={`M${sh.goalX - 8} ${GOAL_Y - 6} L${sh.goalX - 5} ${GOAL_Y + 4} L${sh.goalX + 5} ${GOAL_Y + 4} L${sh.goalX + 8} ${GOAL_Y - 6}`}
            className={k === i ? 's-line' : 's-faint'}
          />
          <line x1={sh.goalX} y1={GOAL_Y + 4} x2={sh.goalX} y2="200" className="s-faint" />
        </g>
      ))}
      <line
        x1={E.x}
        y1={E.y}
        x2={E.x + 22}
        y2={E.y}
        className="s-inner-hood"
        transform={`rotate(${-s.angle} ${E.x} ${E.y})`}
      />
      <circle cx={E.x} cy={E.y} r="2.5" className="s-joint" />
      <g className="s-label">
        <text x="16" y="116">Outer hood</text>
        <line x1="34" y1="120" x2="44" y2="134" className="s-lead" />
        <text x="122" y="214" textAnchor="middle">Inner hood sets the angle: {s.angle}°</text>
      </g>
    </svg>
  )
}

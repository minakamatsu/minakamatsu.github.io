import { useLive } from './useLive'

const C = 120
const R_OUT = 96
const R_IN = 62

const pt = (r, deg) => {
  const a = (deg * Math.PI) / 180
  return [C + r * Math.cos(a), C + r * Math.sin(a)]
}

// Annular sector between two radii and two angles (degrees, clockwise on screen)
const sector = (r1, r2, a0, a1) => {
  const [x0, y0] = pt(r2, a0)
  const [x1, y1] = pt(r2, a1)
  const [x2, y2] = pt(r1, a1)
  const [x3, y3] = pt(r1, a0)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M${x0} ${y0} A${r2} ${r2} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r1} ${r1} 0 ${large} 0 ${x3} ${y3}Z`
}

// Top-down view of an RDE annulus with the detonation wave running around it
export default function RdeSchematic() {
  const [ref, live] = useLive()
  const trail = Array.from({ length: 12 }, (_, i) => i)
  const injectors = Array.from({ length: 36 }, (_, i) => i * 10)

  return (
    <svg ref={ref} className="schem" viewBox="0 0 240 240" role="img" aria-label="Top-down drawing of a rotating detonation engine annulus with a detonation wave traveling around it">
      <circle cx={C} cy={C} r={R_OUT} className="s-line" />
      <circle cx={C} cy={C} r={R_IN} className="s-line" />
      <circle cx={C} cy={C} r={R_IN - 14} className="s-faint" strokeDasharray="2 4" />
      {injectors.map((a) => {
        const [x, y] = pt((R_OUT + R_IN) / 2, a)
        return <circle key={a} cx={x} cy={y} r="1.1" className="s-dot" />
      })}
      <g className={`rde-wave${live ? ' is-live' : ''}`}>
        {trail.map((i) => (
          <path key={i} d={sector(R_IN + 1, R_OUT - 1, -8 * (i + 1), -8 * i)} className="s-hot" style={{ opacity: 0.42 * (1 - i / 12) }} />
        ))}
        <line x1={pt(R_IN + 1, 0)[0]} y1={pt(R_IN + 1, 0)[1]} x2={pt(R_OUT - 1, 0)[0]} y2={pt(R_OUT - 1, 0)[1]} className="s-front" />
      </g>
      <g className="s-label">
        <line x1="10" y1="16" x2="24" y2="16" className="s-front" />
        <text x="30" y="19">Detonation wave</text>
        <text x="8" y="228">Injector ring</text>
        <line x1="34" y1="218" x2="62" y2="178" className="s-lead" />
        <text x={C} y={C + 3} textAnchor="middle">Center body</text>
      </g>
    </svg>
  )
}

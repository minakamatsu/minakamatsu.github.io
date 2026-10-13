import { useLive } from './useLive'

const C = 120

// Backswept blade from hub to tip as a smooth curve
function blade(startDeg, r0, r1, sweep) {
  const toXY = (r, deg) => {
    const a = (deg * Math.PI) / 180
    return [C + r * Math.cos(a), C + r * Math.sin(a)]
  }
  const [x0, y0] = toXY(r0, startDeg)
  const [cx, cy] = toXY((r0 + r1) * 0.55, startDeg + sweep * 0.25)
  const [x1, y1] = toXY(r1, startDeg + sweep)
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`
}

// Front view of a centrifugal compressor impeller with splitter blades
export default function ImpellerSchematic() {
  const [ref, live] = useLive()
  const mains = Array.from({ length: 9 }, (_, i) => i * 40)
  return (
    <svg ref={ref} className="schem" viewBox="0 0 240 240" role="img" aria-label="Front view drawing of a centrifugal compressor impeller">
      <circle cx={C} cy={C} r="104" className="s-faint" strokeDasharray="3 5" />
      <circle cx={C} cy={C} r="96" className="s-line" />
      <g className={`impeller${live ? ' is-live' : ''}`}>
        {mains.map((a) => (
          <path key={`m${a}`} d={blade(a, 20, 95, 62)} className="s-blade" />
        ))}
        {mains.map((a) => (
          <path key={`s${a}`} d={blade(a + 20 + 10, 52, 95, 34)} className="s-splitter" />
        ))}
        <circle cx={C} cy={C} r="20" className="s-hub" />
        <circle cx={C} cy={C} r="6" className="s-line" />
      </g>
      <g className="s-label">
        <text x="8" y="18">Diffuser</text>
        <line x1="26" y1="24" x2="46" y2="46" className="s-lead" />
        <text x="232" y="228" textAnchor="end">Main and splitter blades</text>
      </g>
    </svg>
  )
}

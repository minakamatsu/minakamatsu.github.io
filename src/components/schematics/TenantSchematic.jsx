import { useLive } from './useLive'

// Client sites report into one app, each into its own walled-off lane,
// and each owner's dashboard reads only its lane.
const LANES = [62, 120, 178]

export default function TenantSchematic() {
  const [ref, live] = useLive()
  return (
    <svg ref={ref} className="schem" viewBox="0 18 240 212" role="img" aria-label="Diagram: three client websites send events into separate tenant lanes inside Accelerator OS, and each owner dashboard reads only its own lane">
      <rect x="86" y="36" width="68" height="168" rx="6" className="s-line" />
      {[91, 149].map((y) => (
        <line key={y} x1="86" y1={y} x2="154" y2={y} className="s-wall" />
      ))}
      {LANES.map((y, i) => (
        <g key={y}>
          <rect x="14" y={y - 14} width="40" height="28" rx="3" className="s-line" />
          <line x1="20" y1={y - 6} x2="40" y2={y - 6} className="s-faint" />
          <line x1="20" y1={y} x2="46" y2={y} className="s-faint" />
          <line x1="20" y1={y + 6} x2="34" y2={y + 6} className="s-faint" />
          <path d={`M54 ${y} L96 ${y}`} className={`s-cmd${live ? ' is-live' : ''}`} markerEnd="url(#tn-arrow)" />
          <circle cx="120" cy={y} r="9" className="s-joint" />
          <path d={`M129 ${y} L178 ${y}`} className={`s-cmd${live ? ' is-live' : ''}`} markerEnd="url(#tn-arrow)" />
          <rect x="186" y={y - 14} width="40" height="28" rx="3" className="s-line" />
          <polyline
            points={`${192} ${y + 7} ${199} ${y + 1 - i * 2} ${206} ${y + 4} ${213} ${y - 5} ${220} ${y - 8 + i}`}
            className="s-spark"
          />
        </g>
      ))}
      <defs>
        <marker id="tn-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" className="s-mark-cmd" />
        </marker>
      </defs>
      <g className="s-label">
        <text x="34" y="34" textAnchor="middle">Shop sites</text>
        <text x="120" y="28" textAnchor="middle">One tenant per shop</text>
        <text x="206" y="34" textAnchor="middle">Owner views</text>
        <text x="120" y="222" textAnchor="middle">Row-level security between lanes</text>
      </g>
    </svg>
  )
}

import { useEffect, useState } from 'react'
import { useLive } from './useLive'

// Side view of a generic competition robot inside the 18 inch starting cube,
// cutting between assembled and exploded like a CAD assembly view.
const PARTS = [
  { id: 'tower', dy: -20 },
  { id: 'intake', dx: 14, dy: -8 },
  { id: 'chassis', dy: 0 },
  { id: 'wheels', dy: 10 },
]

export default function AssemblySchematic() {
  const [ref, live] = useLive()
  const [exploded, setExploded] = useState(false)

  useEffect(() => {
    if (!live) {
      setExploded(false)
      return
    }
    const id = setInterval(() => setExploded((e) => !e), 1500)
    return () => clearInterval(id)
  }, [live])

  const t = (id) => {
    const p = PARTS.find((x) => x.id === id)
    return exploded ? `translate(${p.dx || 0} ${p.dy || 0})` : undefined
  }

  return (
    <svg ref={ref} className="schem" viewBox="0 8 240 222" role="img" aria-label="Side view of a competition robot inside its 18 inch starting size, switching between assembled and exploded views">
      <rect x="40" y="30" width="160" height="160" className="s-faint s-arc" />
      <line x1="40" y1="204" x2="200" y2="204" className="s-lead" />
      <line x1="40" y1="199" x2="40" y2="209" className="s-lead" />
      <line x1="200" y1="199" x2="200" y2="209" className="s-lead" />

      <g transform={t('tower')}>
        <rect x="74" y="70" width="10" height="82" rx="2" className="s-line" />
        <rect x="136" y="70" width="10" height="82" rx="2" className="s-line" />
        <line x1="74" y1="74" x2="146" y2="74" className="s-line" />
        <line x1="79" y1="112" x2="141" y2="112" className="s-faint" />
      </g>
      <g transform={t('intake')}>
        <line x1="146" y1="110" x2="184" y2="138" className="s-line" />
        <circle cx="186" cy="140" r="7" className="s-joint" />
        <circle cx="186" cy="140" r="2" className="s-dot" />
      </g>
      <g transform={t('chassis')}>
        <rect x="52" y="152" width="138" height="16" rx="3" className="s-line" />
        <line x1="60" y1="160" x2="182" y2="160" className="s-faint" />
      </g>
      <g transform={t('wheels')}>
        {[70, 121, 172].map((x) => (
          <g key={x}>
            <circle cx={x} cy="176" r="12" className="s-line" />
            <circle cx={x} cy="176" r="3" className="s-joint" />
          </g>
        ))}
      </g>

      <g className="s-label">
        <text x="120" y="222" textAnchor="middle">18 in starting size</text>
        <text x="46" y="24">{exploded ? 'Exploded view' : 'Assembled'}</text>
      </g>
    </svg>
  )
}

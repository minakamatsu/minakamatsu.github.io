import { useLive } from './useLive'

// Operator hand controller on the left, remote gripper on the right.
// Position goes out, force comes back.
export default function HapticsSchematic() {
  const [ref, live] = useLive()
  return (
    <svg ref={ref} className="schem" viewBox="8 20 226 204" role="img" aria-label="Drawing of a teleoperation loop: position commands go from the operator to a remote gripper and force feedback returns">
      {/* operator side: cuff, two links, fingertip */}
      <g>
        <rect x="18" y="150" width="34" height="46" rx="6" className="s-line" />
        <line x1="35" y1="150" x2="48" y2="112" className="s-link" />
        <line x1="48" y1="112" x2="74" y2="96" className="s-link" />
        <circle cx="35" cy="150" r="4" className="s-joint" />
        <circle cx="48" cy="112" r="4" className="s-joint" />
        <circle cx="74" cy="96" r="5" className="s-hub" />
        <path d="M84 84 L76 94" className="s-force-arrow" />
        <path d="M76 94 l1 -7 M76 94 l7 -2" className="s-force-arrow" />
      </g>

      {/* remote side: base, two links, gripper around a block */}
      <g>
        <rect x="178" y="186" width="44" height="10" className="s-line" />
        <line x1="200" y1="186" x2="194" y2="140" className="s-link" />
        <line x1="194" y1="140" x2="170" y2="112" className="s-link" />
        <circle cx="200" cy="186" r="4" className="s-joint" />
        <circle cx="194" cy="140" r="4" className="s-joint" />
        <circle cx="170" cy="112" r="4" className="s-joint" />
        <path d="M170 112 L156 100 M170 112 L160 122" className="s-link" />
        <rect x="140" y="98" width="14" height="22" className="s-hot-box" />
      </g>

      {/* the loop */}
      <defs>
        <marker id="hx-cmd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" className="s-mark-cmd" />
        </marker>
        <marker id="hx-fb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" className="s-mark-fb" />
        </marker>
      </defs>
      <path d="M86 68 C110 40, 140 40, 164 68" className={`s-cmd${live ? ' is-live' : ''}`} markerEnd="url(#hx-cmd)" />
      <path d="M164 150 C140 178, 110 178, 86 150" className={`s-fb${live ? ' is-live' : ''}`} markerEnd="url(#hx-fb)" />

      <g className="s-label">
        <text x="125" y="36" textAnchor="middle">Position</text>
        <text x="125" y="186" textAnchor="middle">Force</text>
        <text x="35" y="214" textAnchor="middle">Operator</text>
        <text x="200" y="214" textAnchor="middle">Robot</text>
      </g>
    </svg>
  )
}

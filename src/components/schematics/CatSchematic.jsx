import { useLive } from './useLive'

// A pixel cat of my own drawing walking along the taskbar of a monitor.
const BODY = [
  '............#..#',
  '#...........####',
  '#...........#.##',
  '.#..........####',
  '.##############.',
  '..#############.',
  '..#############.',
]
const LEGS_A = ['..##.##....##.##', '..#...#....#...#']
const LEGS_B = ['...##.##..##.##.', '...#...#..#...#.']
const PX = 4

function pixels(rows, y0) {
  const out = []
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (row[c] === '#') out.push(<rect key={`${r}-${c}`} x={c * PX} y={(y0 + r) * PX} width={PX} height={PX} />)
    }
  })
  return out
}

export default function CatSchematic() {
  const [ref, live] = useLive()
  const on = live ? ' is-live' : ''
  return (
    <svg ref={ref} className="schem" viewBox="0 12 240 216" role="img" aria-label="Drawing of a pixel cat walking along the bottom of a computer screen">
      <defs>
        <clipPath id="cat-screen">
          <rect x="18" y="34" width="204" height="138" />
        </clipPath>
      </defs>
      <rect x="14" y="30" width="212" height="146" rx="7" className="s-line" />
      <path d="M104 176 L98 200 L142 200 L136 176" className="s-line" />
      <line x1="86" y1="200" x2="154" y2="200" className="s-line" />
      <rect x="34" y="48" width="92" height="62" rx="3" className="s-faint" />
      <line x1="34" y1="58" x2="126" y2="58" className="s-faint" />
      <rect x="108" y="72" width="98" height="64" rx="3" className="s-faint" />
      <line x1="108" y1="82" x2="206" y2="82" className="s-faint" />
      <line x1="18" y1="160" x2="222" y2="160" className="s-line" />
      <g clipPath="url(#cat-screen)">
        <g className={`cat-walk${on}`}>
          <g transform="translate(0 124)" className="cat-px" shapeRendering="crispEdges">
            {pixels(BODY, 0)}
            <g className={`cat-a${on}`}>{pixels(LEGS_A, BODY.length)}</g>
            <g className={`cat-b${on}`}>{pixels(LEGS_B, BODY.length)}</g>
          </g>
        </g>
      </g>
      <g className="s-label">
        <text x="120" y="222" textAnchor="middle">Always on top, lives on the taskbar</text>
      </g>
    </svg>
  )
}

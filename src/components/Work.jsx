import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Section from './Section'
import MediaSlot from './MediaSlot'
import { work } from '../data/content'

function MiniQuad() {
  const arms = [
    [-15, -15],
    [15, -15],
    [-15, 15],
    [15, 15],
  ]
  return (
    <svg className="mini-quad" viewBox="-30 -30 60 60" aria-hidden="true">
      <g className="mq-arm">
        <line x1="-15" y1="-15" x2="15" y2="15" />
        <line x1="15" y1="-15" x2="-15" y2="15" />
      </g>
      <rect x="-5.5" y="-9" width="11" height="18" rx="2" className="mq-body" />
      {arms.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="10.5" className="mq-disc" />
          <g className={`mq-prop ${(x * y > 0) ? 'cw' : 'ccw'}`}>
            <line x1="-9.5" y1="0" x2="9.5" y2="0" />
          </g>
          <circle r="2.6" className="mq-hub" />
        </g>
      ))}
    </svg>
  )
}

// Timeline whose spine is a flight path; a small quad flies down it as you scroll
export default function Work() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] })
  const top = useTransform(scrollYProgress, (v) => `${(v * 100).toFixed(2)}%`)

  return (
    <Section id="experience" title="Experience" lede="Most recent first. Racing, building, and a first startup in progress.">
      <div className="log" ref={ref}>
        <div className="log-spine" aria-hidden="true">
          <motion.div className="log-spine-fill" style={{ scaleY: reduced ? 1 : scrollYProgress }} />
        </div>
        {!reduced && (
          <motion.div className="log-quad" style={{ top }} aria-hidden="true">
            <MiniQuad />
          </motion.div>
        )}
        <ol className="log-list">
          {work.map((w) => (
            <li className="log-item" key={w.org}>
              <p className="log-when">{w.when}</p>
              <div className="log-body">
                <h3 className="log-org">{w.org}</h3>
                <p className="log-role">{w.role}</p>
                <ul className="log-points">
                  {w.points.map((p) => (
                    <li key={p.slice(0, 30)}>{p}</li>
                  ))}
                </ul>
                {w.links?.length ? (
                  <p className="rx-links log-links">
                    {w.links.map(([label, href]) => (
                      <a key={href} href={href} target="_blank" rel="noreferrer">
                        {label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </p>
                ) : null}
                {w.image && (
                  <div className="log-photo-wrap">
                    <MediaSlot src={w.image} alt={`${w.org} photo`} className="log-photo" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

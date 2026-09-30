import { useState } from 'react'
import Section from './Section'
import MediaSlot from './MediaSlot'
import { flying } from '../data/content'

export default function Flying() {
  const [hasPhoto, setHasPhoto] = useState(false)
  return (
    <Section id="flying" title="Flying" lede={flying.lede}>
      <div className="fly">
        <div className="fly-copy">
          {flying.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <figure className={`fly-frame${hasPhoto ? ' has-photo' : ''}`}>
          <MediaSlot
            src={flying.photo.src}
            alt={flying.photo.alt}
            className="fly-photo"
            onLoaded={setHasPhoto}
            fallback={
              <div className="fly-nophoto static" aria-hidden="true">
                {import.meta.env.DEV && <span className="dev-hint">Add public/{flying.photo.src}</span>}
              </div>
            }
          />
          <figcaption className="fly-stats osd-text">
            <p className="fly-stats-title">--- STATS ---</p>
            <dl>
              {flying.stats.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}

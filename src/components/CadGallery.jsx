import { useState } from 'react'
import { cadGallery } from '../data/content'
import { asset } from '../lib/asset'

// Stays hidden until at least one render exists in public/images/.
export default function CadGallery() {
  const [loaded, setLoaded] = useState({})
  const any = Object.values(loaded).some(Boolean)
  if (!cadGallery.length) return null

  return (
    <section
      id="cad"
      className="section cad"
      tabIndex={-1}
      aria-labelledby="cad-title"
      hidden={!any}
    >
      <div className="wrap">
        <header className="sec-head">
          <h2 id="cad-title" className="sec-title">
            CAD
          </h2>
          <p className="sec-lede">70+ projects across SolidWorks, Fusion 360 and Onshape. A few favorites.</p>
        </header>
        <ul className="cad-grid">
          {cadGallery.map((item) => (
            <li key={item.src} hidden={loaded[item.src] === false || (!loaded[item.src] && any)}>
              <figure>
                <img
                  src={asset(item.src)}
                  alt={item.caption || 'CAD render'}
                  onLoad={() => setLoaded((l) => ({ ...l, [item.src]: true }))}
                  onError={() => setLoaded((l) => ({ ...l, [item.src]: false }))}
                />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

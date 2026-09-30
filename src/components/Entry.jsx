import MediaSlot from './MediaSlot'

// One project row: meta column, write-up, and a drawing that a real image replaces.
export default function Entry({ item, Drawing }) {
  const paras = Array.isArray(item.body) ? item.body : [item.body]
  return (
    <li className={`rx${item.feature ? ' rx--feature' : ''}`} id={item.id}>
      <div className="rx-meta">
        <p>{item.when}</p>
        <p>{item.where}</p>
      </div>
      <div className="rx-main">
        <h3 className="rx-title">{item.title}</h3>
        <div className="rx-body">
          {paras.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        {item.learned ? (
          <div className="rx-learned">
            <p className="rx-learned-label">What I learned</p>
            <p>{item.learned}</p>
          </div>
        ) : null}
        <ul className="rx-tags" aria-label="Tools and topics">
          {item.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {item.links?.length ? (
          <p className="rx-links">
            {item.links.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </p>
        ) : null}
      </div>
      <figure className="rx-fig">
        <MediaSlot src={item.image} alt={item.title} className="rx-photo" fallback={Drawing ? <Drawing /> : null} />
      </figure>
    </li>
  )
}

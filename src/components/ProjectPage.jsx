import ProjectVisual from './ProjectVisual'
import ProjectCta from './ProjectCta'
import { projectBySlug } from '../data/routes'

// A project's own page: what it is at a glance, then the write-up section by section.
export default function ProjectPage({ slug, link }) {
  const p = projectBySlug(slug)
  if (!p) return null
  return (
    <>
      <article className="case">
        <div className="wrap">
          <a className="case-back" {...link({ page: 'home', section: 'work' })}>
            <span aria-hidden="true">←</span> All work
          </a>
          <header className="case-head">
            <p className="case-kind">{p.kind}</p>
            <h1 className="case-title">{p.title}</h1>
            <p className="case-summary">{p.summary}</p>
            <p className="case-meta">
              <span>{p.where}</span>
              <span aria-hidden="true">·</span>
              <span>{p.when}</span>
            </p>
          </header>

          <div className="case-top">
            <figure className="case-fig">
              <ProjectVisual project={p} />
            </figure>
            <aside className="case-glance" aria-label="At a glance">
              <p className="glance-title osd-text">--- AT A GLANCE ---</p>
              <dl className="glance osd-text">
                {p.glance.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              {p.links?.length ? (
                <p className="rx-links case-links">
                  {p.links.map(([label, href]) => (
                    <a key={href} href={href} target="_blank" rel="noreferrer">
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </p>
              ) : null}
              <ul className="rx-tags" aria-label="Tools and topics">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="case-body">
            {p.body.map((s) => (
              <section className="case-sec" key={s.p.slice(0, 32)}>
                <h2 className="case-h">{s.h}</h2>
                <p>{s.p}</p>
              </section>
            ))}
            {p.learned ? (
              <section className="case-sec case-learned">
                <h2 className="case-h">What I learned</h2>
                <p>{p.learned}</p>
              </section>
            ) : null}
          </div>
        </div>
      </article>
      <ProjectCta slug={p.slug} link={link} />
    </>
  )
}

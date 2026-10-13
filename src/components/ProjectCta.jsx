import { site } from '../data/content'
import { nextProject } from '../data/routes'
import { asset } from '../lib/asset'

// Bottom of every project page: the next project to read, plus direct ways to get in touch.
export default function ProjectCta({ slug, link }) {
  const next = nextProject(slug)
  return (
    <section className="cta" aria-label="What to read next">
      <div className="wrap">
        <p className="cta-kicker">
          <span className="cta-ch">{next.kind}</span> Next project
        </p>
        <a className="cta-next" {...link({ page: 'project', slug: next.slug })}>
          <span>{next.title}</span>
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
        <p className="cta-teaser">{next.summary}</p>
        <div className="cta-actions">
          <a className="btn btn-signal" href={`mailto:${site.email}`}>
            Email me
          </a>
          <a className="btn btn-ghost" href={asset(site.resume)} download="Min-Naing_Akamatsu_Resume.pdf">
            Download resume
          </a>
          <a className="btn btn-ghost" {...link({ page: 'home', section: 'work' })}>
            All work
          </a>
        </div>
      </div>
    </section>
  )
}

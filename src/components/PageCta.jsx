import { ROUTES } from '../data/routes'
import { site } from '../data/content'
import { asset } from '../lib/asset'

// Bottom-of-page call to action: the next page to read, plus a direct way to
// get in touch. Contact points back to the pages that tell the full story.
const ORDER = ['', 'flying', 'builds', 'engineering', 'experience', 'about', 'contact']
const byId = (id) => ROUTES.find((r) => r.id === id)

export default function PageCta({ route, link }) {
  const onContact = route === 'contact'
  const next = onContact ? byId('experience') : byId(ORDER[ORDER.indexOf(route) + 1])
  const kicker = onContact ? 'Want the full picture?' : route === '' ? 'Start here' : 'Next up'

  return (
    <section className="cta" aria-label="What to read next">
      <div className="wrap">
        <span className="cta-bg" aria-hidden="true">
          {next.channel[1]}
        </span>
        <p className="cta-kicker">
          <span className="cta-ch">{next.channel[0]}</span> {kicker}
        </p>
        <a className="cta-next" {...link(next.id)}>
          <span>{next.label}</span>
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
        <p className="cta-teaser">{next.teaser}</p>
        <div className="cta-actions">
          {onContact ? (
            <a className="btn btn-ghost" {...link('about')}>
              More about me
            </a>
          ) : next.id !== 'contact' ? (
            <a className="btn btn-signal" {...link('contact')}>
              Get in touch
            </a>
          ) : null}
          <a className="btn btn-ghost" href={asset(site.resume)} download="Min-Naing_Akamatsu_Resume.pdf">
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}

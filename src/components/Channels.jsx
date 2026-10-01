import Section from './Section'
import { PAGES } from '../data/routes'

// Home page index, styled like flipping through video channels.
export default function Channels({ link }) {
  return (
    <Section id="channels" title="Pick a channel" lede="Each page is its own channel. Start anywhere.">
      <ul className="ch-grid">
        {PAGES.map((p) => (
          <li key={p.id}>
            <a className="ch-card" {...link(p.id)}>
              <span className="ch-freq">
                {p.channel[0]} {p.channel[1]}
              </span>
              <span className="ch-title">{p.label}</span>
              <span className="ch-teaser">{p.teaser}</span>
              <span className="ch-go" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

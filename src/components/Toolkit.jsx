import Section from './Section'
import { toolkit, interests, credentials } from '../data/content'

const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1)

export default function Toolkit() {
  return (
    <Section
      id="skills"
      title="Skills"
      lede="I've been CADing since 8th grade in Fusion 360, Onshape and SolidWorks, mostly when I was supposed to be doing homework."
    >
      <dl className="kit">
        <div className="kit-row kit-row--creds">
          <dt className="kit-area">Licenses</dt>
          <dd className="kit-items">
            {credentials.map((c) => (
              <span className="kit-cred" key={c.name}>
                {c.name}
                {c.id ? ` (${c.id})` : ''}
              </span>
            ))}
          </dd>
          <dd className="kit-note">{credentials.map((c) => c.note).join(' ')}</dd>
        </div>
        {toolkit.map((k) => (
          <div className="kit-row" key={k.area}>
            <dt className="kit-area">{k.area}</dt>
            <dd className="kit-items">{cap(k.items.join(', '))}</dd>
            {k.note ? <dd className="kit-note">{k.note}</dd> : <dd className="kit-note" aria-hidden="true" />}
          </div>
        ))}
      </dl>
      <p className="kit-interests">
        Most interested in {interests.slice(0, -1).join(', ')} and {interests[interests.length - 1]}.
      </p>
    </Section>
  )
}

import Section from './Section'
import { toolkit, interests } from '../data/content'

const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1)

export default function Toolkit() {
  return (
    <Section id="toolkit" title="Toolkit">
      <dl className="kit">
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

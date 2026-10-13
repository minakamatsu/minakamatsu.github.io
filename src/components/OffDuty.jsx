import Section from './Section'
import { offDuty } from '../data/content'

export default function OffDuty() {
  return (
    <Section id="off" title="Off the sticks" className="off">
      <div className="off-grid">
        {offDuty.map((o) => (
          <div key={o.title}>
            <h3 className="h3">{o.title}</h3>
            <p>{o.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

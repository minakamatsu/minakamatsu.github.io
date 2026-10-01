import Section from './Section'
import { education, honors } from '../data/content'

export default function Record() {
  return (
    <Section id="record" title="Record">
      <div className="record">
        <div>
          <h3 className="h3">Education</h3>
          <ul className="edu">
            {education.map((e) => (
              <li key={e.school}>
                <p className="edu-school">{e.school}</p>
                <p className="edu-when">{e.when}</p>
                <p className="edu-detail">{e.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="h3">Honors</h3>
          <ol className="honors">
            {honors.map((h) => (
              <li key={h.title}>
                <span className="honor-year">{h.year}</span>
                <span>
                  <span className="honor-title">{h.title}</span>
                  <span className="honor-detail">{h.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

import Section from './Section'
import ProjectCard from './ProjectCard'
import { projects, experiments } from '../data/content'

const featured = projects.filter((p) => p.featured)
const software = projects.filter((p) => !p.featured)

export default function WorkIndex({ link }) {
  return (
    <Section
      id="work"
      title="Work"
      lede="Drones first, then robotics, propulsion and CAD. Every project opens to its own page."
    >
      <ul className="work-grid">
        {featured.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} link={link} />
        ))}
      </ul>

      {software.length > 0 && (
        <div className="work-sub">
          <div className="work-sub-head">
            <h3 className="h3">Software I've shipped</h3>
            <p>Designed, built and deployed myself.</p>
          </div>
          <ul className="work-grid work-grid--compact">
            {software.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={featured.length + i} link={link} compact />
            ))}
          </ul>
        </div>
      )}

      {experiments.length > 0 && (
        <div className="rx-more">
          <h3 className="h3">More experiments</h3>
          <dl>
            {experiments.map(([name, text]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </Section>
  )
}

import Section from './Section'
import Entry from './Entry'
import { builds, moreBuilds } from '../data/content'
import BuildCheck from './schematics/BuildCheck'
import TenantSchematic from './schematics/TenantSchematic'
import CatSchematic from './schematics/CatSchematic'

const DRAWINGS = { buildcheck: BuildCheck, tenants: TenantSchematic, cat: CatSchematic }

export default function Builds() {
  return (
    <Section id="builds" title="Builds" lede="Software I've designed, built and deployed myself, starting with the one for building quads.">
      <ol className="rx-list">
        {builds.map((b) => (
          <Entry key={b.id} item={b} Drawing={DRAWINGS[b.drawing]} />
        ))}
      </ol>
      <div className="rx-more">
        <h3 className="h3">More experiments</h3>
        <dl>
          {moreBuilds.map(([name, text]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

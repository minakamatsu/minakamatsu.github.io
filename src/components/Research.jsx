import Section from './Section'
import Entry from './Entry'
import { research, otherBuilds } from '../data/content'
import RdeSchematic from './schematics/RdeSchematic'
import HapticsSchematic from './schematics/HapticsSchematic'
import ImpellerSchematic from './schematics/ImpellerSchematic'

const DRAWINGS = { rde: RdeSchematic, haptics: HapticsSchematic, jet: ImpellerSchematic }

export default function Research() {
  return (
    <Section
      id="research"
      title="Research"
      lede="Propulsion and teleoperation, the two problems I keep coming back to."
    >
      <ol className="rx-list">
        {research.map((r) => (
          <Entry key={r.id} item={r} Drawing={DRAWINGS[r.schematic]} />
        ))}
      </ol>
      <div className="rx-more">
        <h3 className="h3">Other builds</h3>
        <dl>
          {otherBuilds.map(([name, text]) => (
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

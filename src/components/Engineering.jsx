import Section from './Section'
import Entry from './Entry'
import { engineering } from '../data/content'
import RdeSchematic from './schematics/RdeSchematic'
import ImpellerSchematic from './schematics/ImpellerSchematic'

const DRAWINGS = { rde: RdeSchematic, jet: ImpellerSchematic }

export default function Engineering() {
  return (
    <Section
      id="engineering"
      title="Engineering"
      lede="Mostly propulsion so far: one research project, and jet engine parts I've been designing on my own since high school."
    >
      <ol className="rx-list">
        {engineering.map((r) => (
          <Entry key={r.id} item={r} Drawing={DRAWINGS[r.schematic]} />
        ))}
      </ol>
    </Section>
  )
}

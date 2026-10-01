import Section from './Section'
import Entry from './Entry'
import { engineering } from '../data/content'
import RdeSchematic from './schematics/RdeSchematic'
import ImpellerSchematic from './schematics/ImpellerSchematic'
import KiwiSchematic from './schematics/KiwiSchematic'
import ShooterSchematic from './schematics/ShooterSchematic'

const DRAWINGS = { rde: RdeSchematic, jet: ImpellerSchematic, kiwi: KiwiSchematic, shooter: ShooterSchematic }

export default function Engineering() {
  return (
    <Section
      id="engineering"
      title="Engineering"
      lede="I've been CADing since 8th grade in Fusion 360, Onshape and SolidWorks, mostly when I was supposed to be doing homework."
    >
      <ol className="rx-list">
        {engineering.map((r) => (
          <Entry key={r.id} item={r} Drawing={DRAWINGS[r.schematic]} />
        ))}
      </ol>
    </Section>
  )
}

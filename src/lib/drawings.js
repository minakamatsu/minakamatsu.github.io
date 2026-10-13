// Code-drawn visuals for each project. A real photo at the project's `image` path replaces these.
import QuadSizesSchematic from '../components/schematics/QuadSizesSchematic'
import BuildCheck from '../components/schematics/BuildCheck'
import ShooterSchematic from '../components/schematics/ShooterSchematic'
import AssemblySchematic from '../components/schematics/AssemblySchematic'
import RdeSchematic from '../components/schematics/RdeSchematic'
import ImpellerSchematic from '../components/schematics/ImpellerSchematic'
import TenantSchematic from '../components/schematics/TenantSchematic'
import CatSchematic from '../components/schematics/CatSchematic'

export const DRAWINGS = {
  quads: QuadSizesSchematic,
  buildcheck: BuildCheck,
  shooter: ShooterSchematic,
  assembly: AssemblySchematic,
  rde: RdeSchematic,
  jet: ImpellerSchematic,
  tenants: TenantSchematic,
  cat: CatSchematic,
}

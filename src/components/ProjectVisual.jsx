import MediaSlot from './MediaSlot'
import { DRAWINGS } from '../lib/drawings'

export default function ProjectVisual({ project, className = '' }) {
  const Drawing = DRAWINGS[project.drawing]
  return (
    <div className={`pvis ${className}`}>
      <MediaSlot src={project.image} alt={project.title} className="pvis-photo" fallback={Drawing ? <Drawing /> : null} />
    </div>
  )
}

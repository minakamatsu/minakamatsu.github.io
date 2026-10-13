import ProjectVisual from './ProjectVisual'

// One card in the Work grid. The whole card is a link to the project's own page.
export default function ProjectCard({ project, index, link, compact = false }) {
  return (
    <li className={`pcard${compact ? ' pcard--compact' : ''}`}>
      <a className="pcard-link" {...link({ page: 'project', slug: project.slug })}>
        <div className="pcard-fig">
          {!compact && (
            <span className="pcard-idx" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <span className="pcard-badge">{project.badge}</span>
          <ProjectVisual project={project} />
        </div>
        <div className="pcard-body">
          <p className="pcard-kind">
            {project.kind}
            <span className="pcard-badge-inline">{project.badge}</span>
          </p>
          <h3 className="pcard-title">{project.title}</h3>
          <p className="pcard-summary">{project.summary}</p>
          <p className="pcard-go">
            Read the write-up <span aria-hidden="true">→</span>
          </p>
        </div>
      </a>
    </li>
  )
}

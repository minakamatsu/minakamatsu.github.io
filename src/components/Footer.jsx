import { site } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span aria-hidden="true"> · </span>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span aria-hidden="true"> · </span>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p>
        © {new Date().getFullYear()} {site.first} {site.last}
      </p>
    </footer>
  )
}

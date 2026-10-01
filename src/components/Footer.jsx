import { site } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <p>Built with React and Three.js, hosted on GitHub Pages.</p>
      <p>
        © {new Date().getFullYear()} {site.first} {site.last}
      </p>
    </footer>
  )
}

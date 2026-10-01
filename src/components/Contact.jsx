import { site, contact } from '../data/content'
import { asset } from '../lib/asset'

export default function Contact() {
  return (
    <section id="contact" className="section contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="wrap">
        <header className="sec-head">
          <h2 id="contact-title" className="sec-title">
            Contact
          </h2>
          <p className="sec-lede">{contact.lede}</p>
        </header>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <ul className="contact-links">
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={asset(site.resume)} download="Min-Naing_Akamatsu_Resume.pdf">
              Download resume
            </a>
          </li>
        </ul>
      </div>
      <footer className="footer">
        <p>Built with React and Three.js, hosted on GitHub Pages.</p>
        <p>© {new Date().getFullYear()} {site.first} {site.last}</p>
      </footer>
    </section>
  )
}

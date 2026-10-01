export default function Section({ id, title, lede, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <header className="sec-head">
          <h2 id={`${id}-title`} className="sec-title">
            {title}
          </h2>
          {lede && <p className="sec-lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

import { Component, lazy, Suspense } from 'react'
import OsdOverlay from './OsdOverlay'
import { site } from '../data/content'
import { asset } from '../lib/asset'

const DroneScene = lazy(() => import('./DroneScene'))
const Fallback = lazy(() => import('./DroneScene').then((m) => ({ default: m.QuadFallback })))

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed)
      return (
        <Suspense fallback={null}>
          <div className="drone-scene">
            <Fallback />
          </div>
        </Suspense>
      )
    return this.props.children
  }
}

export default function Hero({ link }) {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <SceneBoundary>
        <Suspense fallback={null}>
          <DroneScene />
        </Suspense>
      </SceneBoundary>
      <div className="hero-scan" aria-hidden="true" />
      <OsdOverlay />
      <div className="hero-copy">
        <h1 className="hero-name">
          <span>{site.first}</span>
          <span>{site.last}</span>
        </h1>
        <p className="hero-line">{site.heroLine}</p>
        <div className="hero-actions">
          <a className="btn btn-signal" href={asset(site.resume)} download="Min-Naing_Akamatsu_Resume.pdf">
            Download resume
          </a>
          <a className="btn btn-ghost" {...link('contact')}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

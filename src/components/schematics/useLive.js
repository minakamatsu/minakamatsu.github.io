import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { prefersReducedMotion } from '../../lib/flight'

// True while the drawing is on screen and motion is allowed.
export function useLive() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  return [ref, inView && !prefersReducedMotion()]
}

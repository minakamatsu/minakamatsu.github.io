// Shared, non-React state for the hero: pointer position and arming time.
// Read inside animation loops so nothing re-renders 60 times a second.
export const flight = {
  px: 0, // pointer x, -1 (left) to 1 (right)
  py: 0, // pointer y, -1 (bottom) to 1 (top)
  armedAt: 0, // performance.now() when the quad arms
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      flight.px = (e.clientX / window.innerWidth) * 2 - 1
      flight.py = -((e.clientY / window.innerHeight) * 2 - 1)
    },
    { passive: true },
  )
}

export function arm(delay = 0) {
  if (!flight.armedAt) flight.armedAt = performance.now() + delay
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { flight, prefersReducedMotion } from '../lib/flight'

const COL = { fde: '#C9AE7C', signal: '#FF6B1A', ink: '#141815' }
const damp = THREE.MathUtils.damp
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const clamp01 = (t) => Math.min(1, Math.max(0, t))

// Where the quad sits on screen, recomputed on resize
const layout = { x: 0, y: 0, ground: -1.6 }

/* ---------- materials and geometry (built once) ---------- */

function carbonTexture() {
  const s = 128
  const cell = 8
  const c = document.createElement('canvas')
  c.width = c.height = s
  const g = c.getContext('2d')
  for (let y = 0; y < s / cell; y++) {
    for (let x = 0; x < s / cell; x++) {
      const horiz = (x + y) % 4 < 2
      const grad = horiz
        ? g.createLinearGradient(0, y * cell, 0, (y + 1) * cell)
        : g.createLinearGradient(x * cell, 0, (x + 1) * cell, 0)
      grad.addColorStop(0, '#121412')
      grad.addColorStop(0.5, horiz ? '#303632' : '#252a26')
      grad.addColorStop(1, '#121412')
      g.fillStyle = grad
      g.fillRect(x * cell, y * cell, cell, cell)
    }
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(3, 3)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

function armGeometry(L) {
  const w0 = 0.11
  const w1 = 0.07
  const r = 0.16
  const s = new THREE.Shape()
  s.moveTo(0, -w0)
  s.lineTo(L - 0.14, -w1)
  s.absarc(L, 0, r, Math.PI + 0.5, Math.PI - 0.5, false)
  s.lineTo(0, w0)
  s.closePath()
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.055,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 1,
    curveSegments: 28,
  })
  geo.rotateX(-Math.PI / 2) // lay flat, thickness points up
  return geo
}

function bladeGeometry() {
  const s = new THREE.Shape()
  s.moveTo(0, -0.028)
  s.bezierCurveTo(0.15, -0.05, 0.3, -0.045, 0.4, -0.02)
  s.quadraticCurveTo(0.43, 0, 0.4, 0.022)
  s.bezierCurveTo(0.3, 0.03, 0.15, 0.04, 0, 0.03)
  s.closePath()
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.01, bevelEnabled: false, curveSegments: 12 })
  geo.rotateX(-Math.PI / 2)
  geo.translate(0.05, -0.005, 0)
  return geo
}

function useKit() {
  return useMemo(() => {
    const carbonMap = carbonTexture()
    const mats = {
      carbon: new THREE.MeshStandardMaterial({ color: '#ffffff', map: carbonMap, roughness: 0.38, metalness: 0.3 }),
      bell: new THREE.MeshStandardMaterial({ color: COL.fde, metalness: 0.85, roughness: 0.3 }),
      stator: new THREE.MeshStandardMaterial({ color: '#3a3f3b', metalness: 0.7, roughness: 0.4 }),
      black: new THREE.MeshStandardMaterial({ color: '#0e100f', roughness: 0.55, metalness: 0.15 }),
      battery: new THREE.MeshStandardMaterial({ color: '#1f2320', roughness: 0.5, metalness: 0.1 }),
      tpu: new THREE.MeshStandardMaterial({ color: COL.signal, roughness: 0.75 }),
      prop: new THREE.MeshStandardMaterial({ color: COL.signal, roughness: 0.35, transparent: true, opacity: 0.95 }),
      disc: new THREE.MeshBasicMaterial({
        color: COL.signal,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      lens: new THREE.MeshStandardMaterial({
        color: '#0a1720',
        metalness: 0.9,
        roughness: 0.08,
        emissive: '#16405c',
        emissiveIntensity: 0.7,
      }),
      pcb: new THREE.MeshStandardMaterial({ color: '#1d3326', roughness: 0.6 }),
      led: new THREE.MeshBasicMaterial({ color: COL.signal }),
      edge: new THREE.LineBasicMaterial({ color: COL.fde, transparent: true, opacity: 0.3 }),
      gate: new THREE.MeshBasicMaterial({ color: COL.fde, transparent: true, opacity: 0.32 }),
    }
    const L = Math.hypot(0.95, 0.95)
    const geo = {
      arm: armGeometry(L),
      plateBottom: new THREE.BoxGeometry(0.6, 0.04, 1.08),
      plateTop: new THREE.BoxGeometry(0.54, 0.035, 0.98),
      standoff: new THREE.CylinderGeometry(0.022, 0.022, 0.315, 10),
      stack: new THREE.BoxGeometry(0.3, 0.14, 0.3),
      battery: new THREE.BoxGeometry(0.36, 0.24, 0.8),
      strap: new THREE.BoxGeometry(0.39, 0.256, 0.06),
      camBody: new THREE.BoxGeometry(0.2, 0.2, 0.16),
      camLens: new THREE.CylinderGeometry(0.075, 0.08, 0.08, 24),
      camGlass: new THREE.CircleGeometry(0.056, 24),
      camSide: new THREE.BoxGeometry(0.025, 0.28, 0.26),
      stator: new THREE.CylinderGeometry(0.12, 0.12, 0.04, 28),
      bell: new THREE.CylinderGeometry(0.135, 0.135, 0.12, 32),
      cap: new THREE.CylinderGeometry(0.05, 0.06, 0.03, 16),
      hub: new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16),
      blade: bladeGeometry(),
      disc: new THREE.CircleGeometry(0.52, 48),
      vtxMount: new THREE.BoxGeometry(0.14, 0.08, 0.1),
      antenna: new THREE.CylinderGeometry(0.012, 0.012, 0.42, 8),
      mushroom: new THREE.SphereGeometry(0.07, 20, 12),
      rxTube: new THREE.CylinderGeometry(0.009, 0.009, 0.34, 6),
      led: new THREE.BoxGeometry(0.22, 0.012, 0.03),
    }
    const edges = {
      arm: new THREE.EdgesGeometry(geo.arm, 35),
      plateTop: new THREE.EdgesGeometry(geo.plateTop),
      plateBottom: new THREE.EdgesGeometry(geo.plateBottom),
      battery: new THREE.EdgesGeometry(geo.battery),
    }
    return { mats, geo, edges, L }
  }, [])
}

/* ---------- parts ---------- */

const MOTORS = [
  [0.95, 0.95],
  [-0.95, 0.95],
  [0.95, -0.95],
  [-0.95, -0.95],
]

function Prop({ kit, dir, spin }) {
  const ref = useRef()
  const start = useMemo(() => Math.random() * Math.PI, [])
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dir * Math.min(dt, 0.05) * 48 * spin.current
  })
  return (
    <group position={[0, 0.205, 0]}>
      <mesh geometry={kit.geo.disc} material={kit.mats.disc} rotation-x={-Math.PI / 2} />
      <group ref={ref} rotation-y={start}>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation-y={(i * Math.PI * 2) / 3}>
            <mesh geometry={kit.geo.blade} material={kit.mats.prop} rotation-x={dir * 0.26} />
          </group>
        ))}
        <mesh geometry={kit.geo.hub} material={kit.mats.black} />
      </group>
    </group>
  )
}

function Motor({ kit, x, z, spin }) {
  const dir = x * z > 0 ? 1 : -1
  return (
    <group position={[x, 0.055, z]}>
      <mesh geometry={kit.geo.stator} material={kit.mats.stator} position-y={0.02} />
      <mesh geometry={kit.geo.bell} material={kit.mats.bell} position-y={0.1} />
      <mesh geometry={kit.geo.cap} material={kit.mats.black} position-y={0.175} />
      <Prop kit={kit} dir={dir} spin={spin} />
    </group>
  )
}

function Arm({ kit, x, z }) {
  const rot = Math.atan2(-z, x)
  return (
    <group rotation-y={rot}>
      <mesh geometry={kit.geo.arm} material={kit.mats.carbon} />
      <lineSegments geometry={kit.edges.arm} material={kit.mats.edge} />
      <mesh geometry={kit.geo.led} material={kit.mats.led} position={[kit.L * 0.55, -0.008, 0]} />
    </group>
  )
}

function Quad({ kit, spin }) {
  const { mats, geo, edges } = kit
  return (
    <group>
      {MOTORS.map(([x, z]) => (
        <Arm key={`a${x}${z}`} kit={kit} x={x} z={z} />
      ))}
      {MOTORS.map(([x, z]) => (
        <Motor key={`m${x}${z}`} kit={kit} x={x} z={z} spin={spin} />
      ))}

      {/* body */}
      <group position-y={-0.02}>
        <mesh geometry={geo.plateBottom} material={mats.carbon} />
        <lineSegments geometry={edges.plateBottom} material={mats.edge} />
      </group>
      {[
        [0.22, 0.4],
        [-0.22, 0.4],
        [0.22, -0.4],
        [-0.22, -0.4],
      ].map(([x, z]) => (
        <mesh key={`s${x}${z}`} geometry={geo.standoff} material={mats.black} position={[x, 0.2125, z]} />
      ))}
      <mesh geometry={geo.stack} material={mats.pcb} position={[0, 0.13, -0.05]} />
      <group position-y={0.3875}>
        <mesh geometry={geo.plateTop} material={mats.carbon} />
        <lineSegments geometry={edges.plateTop} material={mats.edge} />
      </group>

      {/* battery and strap */}
      <group position={[0, 0.525, -0.02]}>
        <mesh geometry={geo.battery} material={mats.battery} />
        <lineSegments geometry={edges.battery} material={mats.edge} />
        <mesh geometry={geo.strap} material={mats.tpu} position-z={0.05} />
      </group>

      {/* FPV camera, tilted up like a racing setup */}
      <group position={[0, 0.2, 0.44]}>
        <mesh geometry={geo.camSide} material={mats.tpu} position-x={0.125} />
        <mesh geometry={geo.camSide} material={mats.tpu} position-x={-0.125} />
        <group rotation-x={-0.5}>
          <mesh geometry={geo.camBody} material={mats.black} />
          <mesh geometry={geo.camLens} material={mats.black} rotation-x={Math.PI / 2} position-z={0.115} />
          <mesh geometry={geo.camGlass} material={mats.lens} position-z={0.157} />
        </group>
      </group>

      {/* VTX antenna and receiver tubes at the rear */}
      <mesh geometry={geo.vtxMount} material={mats.tpu} position={[0, 0.44, -0.5]} />
      <group position={[0, 0.62, -0.6]} rotation-x={-0.5}>
        <mesh geometry={geo.antenna} material={mats.black} />
        <mesh geometry={geo.mushroom} material={mats.black} position-y={0.21} scale={[1, 0.62, 1]} />
      </group>
      {[1, -1].map((s) => (
        <mesh
          key={`rx${s}`}
          geometry={geo.rxTube}
          material={mats.tpu}
          position={[0.24 * s, 0.34, -0.52]}
          rotation={[-0.45, 0, -0.75 * s]}
        />
      ))}
    </group>
  )
}

function Gate({ kit, position, rotY = 0 }) {
  const w = 2.3
  const h = 1.8
  const t = 0.07
  return (
    <group position={position} rotation-y={rotY}>
      <mesh material={kit.mats.gate} position={[0, h, 0]}>
        <boxGeometry args={[w + t, t, t]} />
      </mesh>
      <mesh material={kit.mats.gate} position={[-w / 2, h / 2, 0]}>
        <boxGeometry args={[t, h, t]} />
      </mesh>
      <mesh material={kit.mats.gate} position={[w / 2, h / 2, 0]}>
        <boxGeometry args={[t, h, t]} />
      </mesh>
    </group>
  )
}

/* ---------- camera + layout ---------- */

function Rig() {
  const { camera, size, scene } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    const wide = size.width >= 900
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    const fitWidth = wide ? 8.4 : 4.3 // world units that must fit across the screen
    const dist = Math.max(wide ? 8.2 : 8, fitWidth / (2 * tan * aspect))
    camera.position.set(0, dist * 0.42, dist * 0.91)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    const visH = 2 * dist * tan
    const visW = visH * aspect
    const fx = wide ? 0.66 : 0.5
    const fy = wide ? 0.36 : 0.3
    layout.x = (fx - 0.5) * visW
    layout.y = (0.5 - fy) * visH * 0.92
    layout.ground = layout.y - 2.1
    if (scene.fog) {
      scene.fog.near = dist * 0.9
      scene.fog.far = dist + 11
    }
  }, [camera, size, scene])
  return null
}

/* ---------- the flying part ---------- */

function Flight({ kit, reduced }) {
  const root = useRef()
  const att = useRef()
  const ground = useRef()
  const spin = useRef(0)

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const t = state.clock.elapsedTime
    const armedFor = flight.armedAt ? (performance.now() - flight.armedAt) / 1000 : -1
    const spool = reduced ? 1 : clamp01(armedFor / 0.7)
    const lift = reduced ? 1 : easeOut(clamp01((armedFor - 0.35) / 1.1))
    spin.current = reduced ? 0 : spool

    kit.mats.disc.opacity = 0.1 * spool
    kit.mats.prop.opacity = 0.95 - 0.6 * spool

    const p = Math.min(1.4, window.scrollY / window.innerHeight)
    const hover = reduced ? 0 : (Math.sin(t * 1.7) * 0.05 + Math.sin(t * 0.83) * 0.03) * lift

    const r = root.current
    r.position.x = layout.x
    r.position.y = layout.y - 0.9 * (1 - lift) + hover + p * 1.6
    r.position.z = -p * 5

    const a = att.current
    const idle = reduced ? 0 : Math.sin(t * 0.7) * 0.05
    const px = reduced ? 0 : flight.px
    const py = reduced ? 0 : flight.py
    a.rotation.z = damp(a.rotation.z, -px * 0.32 + idle, 4, dt)
    a.rotation.x = damp(a.rotation.x, py * 0.14 + p * 0.35, 4, dt)
    a.rotation.y = damp(a.rotation.y, -0.55 + px * 0.35 + p * 2.4, 3, dt)

    if (ground.current) {
      ground.current.position.y = layout.ground
      ground.current.position.x = layout.x
    }
  })

  return (
    <>
      <group ref={root}>
        <group ref={att} rotation-order="YXZ">
          <Quad kit={kit} spin={spin} />
          <pointLight position={[0, -0.25, 0]} color={COL.signal} intensity={1.6} distance={2.6} />
        </group>
      </group>
      <group ref={ground}>
        <gridHelper
          args={[60, 60, COL.fde, '#56615a']}
          onUpdate={(g) => {
            g.material.transparent = true
            g.material.opacity = 0.5
          }}
        />
        <Gate kit={kit} position={[-1.6, 0, -6.5]} rotY={0.3} />
        <Gate kit={kit} position={[2.4, 0, -11]} rotY={-0.25} />
      </group>
    </>
  )
}

function Scene({ reduced }) {
  const kit = useKit()
  return (
    <>
      <fog attach="fog" args={[COL.ink, 7, 22]} />
      <Rig />
      <hemisphereLight args={['#dfe6da', COL.ink, 0.6]} />
      <directionalLight position={[3, 5, 4]} intensity={2.6} color="#fff3e2" />
      <directionalLight position={[-4, 2.5, -4]} intensity={2.4} color={COL.fde} />
      <directionalLight position={[-3, -1, 3]} intensity={0.5} color="#a9bccc" />
      <Flight kit={kit} reduced={reduced} />
    </>
  )
}

export function QuadFallback() {
  return (
    <svg className="quad-fallback" viewBox="-60 -60 120 120" aria-hidden="true">
      <g stroke="var(--fde)" strokeWidth="5" strokeLinecap="round">
        <line x1="-34" y1="-34" x2="34" y2="34" />
        <line x1="34" y1="-34" x2="-34" y2="34" />
      </g>
      <rect x="-10" y="-16" width="20" height="32" rx="3" fill="var(--signal)" />
      {[
        [-34, -34],
        [34, -34],
        [-34, 34],
        [34, 34],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="20" fill="none" stroke="var(--fde)" strokeOpacity=".5" />
      ))}
    </svg>
  )
}

export default function DroneScene() {
  const host = useRef()
  const [active, setActive] = useState(true)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    const el = host.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={host} className="drone-scene">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 32, near: 0.1, far: 80, position: [0, 1.4, 7] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
        fallback={<QuadFallback />}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  )
}

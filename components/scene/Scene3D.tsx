'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import { AvatarPlaceholder } from './AvatarPlaceholder'
import { PassionNode } from './PassionNode'
import type { PassionData } from '@/app/HomeClient'

const DEFAULT_POSITIONS: [number, number, number][] = [
  [-2.2,  1.5, 0],  // alto sx
  [ 2.2,  1.5, 0],  // alto dx
  [-2.2, -1.5, 0],  // basso sx
  [ 2.2, -1.5, 0],  // basso dx
]
const DEFAULT_PHASES = [0, 1.5, 3, 4.5]

const HOME_CAM   = new Vector3(0, 0, 5.5)
const ZOOM_DIST  = 2.8   // distanza camera dal nodo dopo lo zoom
const ZOOM_DUR   = 1.6   // secondi animazione zoom
const RESET_DUR  = 1.2

interface CinematicCameraProps {
  target: Vector3 | null   // posizione world del nodo selezionato
  resetSignal: number
  onZoomComplete: () => void
}

function CinematicCamera({ target, resetSignal, onZoomComplete }: CinematicCameraProps) {
  const { camera } = useThree()
  const phase    = useRef<'idle' | 'zoom' | 'reset'>('idle')
  const timer    = useRef(0)
  const notified = useRef(false)
  const startCam = useRef(new Vector3())

  useEffect(() => {
    if (!target) return
    phase.current    = 'zoom'
    timer.current    = 0
    notified.current = false
    startCam.current.copy(camera.position)
  }, [target]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resetSignal === 0) return
    phase.current = 'reset'
    timer.current = 0
    startCam.current.copy(camera.position)
  }, [resetSignal])

  useFrame((_, delta) => {
    if (phase.current === 'zoom' && target) {
      timer.current = Math.min(ZOOM_DUR, timer.current + delta)
      const t = easeInOutCubic(timer.current / ZOOM_DUR)

      // Camera va davanti al nodo (stesso X/Y, Z avanzato)
      const destZ = target.z + ZOOM_DIST
      camera.position.x = lerp(startCam.current.x, target.x, t)
      camera.position.y = lerp(startCam.current.y, target.y, t)
      camera.position.z = lerp(startCam.current.z, destZ, t)
      camera.lookAt(target.x, target.y, target.z)

      if (timer.current >= ZOOM_DUR && !notified.current) {
        notified.current = true
        phase.current    = 'idle'
        onZoomComplete()
      }
    }

    if (phase.current === 'reset') {
      timer.current = Math.min(RESET_DUR, timer.current + delta)
      const t = easeOutCubic(timer.current / RESET_DUR)
      camera.position.lerpVectors(startCam.current, HOME_CAM, t)
      camera.lookAt(0, 0, 0)
      if (timer.current >= RESET_DUR) phase.current = 'idle'
    }
  })

  return null
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

interface SceneContentProps {
  passions: PassionData[]
  positions: [number, number, number][]
  selected: number | null
  avatarSelected: boolean
  zooming: boolean
  onSelect: (i: number) => void
  onAvatarClick?: () => void
  avatarUrl?: string | null
}

function SceneContent({ passions, positions, selected, avatarSelected, zooming, onSelect, onAvatarClick, avatarUrl }: SceneContentProps) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.03
  })

  const anySel = selected !== null || avatarSelected

  return (
    <group ref={groupRef}>
      <AvatarPlaceholder avatarUrl={avatarUrl} hidden={selected !== null} isSelected={avatarSelected} onAvatarClick={onAvatarClick} />
      {passions.map((p, i) => (
        <PassionNode
          key={p.id}
          position={positions[i]}
          color={p.color}
          emoji={p.emoji ?? undefined}
          name={p.name}
          modelUrl={p.modelUrl ?? undefined}
          useModelColor={p.useModelColor}
          phaseOffset={DEFAULT_PHASES[i] ?? i * 1.5}
          isSelected={selected === i}
          anySelected={anySel}
          frozen={zooming}
          onSelect={() => onSelect(i)}
        />
      ))}
    </group>
  )
}

interface Scene3DProps {
  avatarUrl?: string | null
  passions: PassionData[]
  onPassionSelect: (passion: PassionData | null) => void
  onZoomComplete: (passion: PassionData) => void
  onAvatarClick?: () => void
  resetSignal: number
  mobilePositions?: [number, number, number][]
  allowPanY?: boolean
}

export function Scene3D({ avatarUrl, passions, onPassionSelect, onZoomComplete, onAvatarClick, resetSignal, mobilePositions, allowPanY }: Scene3DProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [avatarSelected, setAvatarSelected] = useState(false)
  const [zooming, setZooming] = useState(false)
  const [zoomTarget, setZoomTarget] = useState<Vector3 | null>(null)
  const pendingPassion = useRef<PassionData | null>(null)
  const pendingAvatar = useRef(false)

  const positions: [number, number, number][] = passions.map((p, i) => {
    if (mobilePositions?.[i]) return mobilePositions[i]
    const hasPos = p.positionX !== 0 || p.positionY !== 0 || p.positionZ !== 0
    return hasPos
      ? [p.positionX, p.positionY, p.positionZ]
      : DEFAULT_POSITIONS[i] ?? [0, 0, 0]
  })

  const handleSelect = (i: number) => {
    const p = passions[i]
    setSelected(i)
    setZooming(true)
    setZoomTarget(new Vector3(...positions[i]))
    pendingPassion.current = p
    onPassionSelect(p)
  }

  const handleAvatarClick = () => {
    setAvatarSelected(true)
    setZooming(true)
    setZoomTarget(new Vector3(0, 0, 0))
    pendingAvatar.current = true
  }

  const handleZoomComplete = () => {
    setZooming(false)
    if (pendingAvatar.current) {
      pendingAvatar.current = false
      onAvatarClick?.()
    } else if (pendingPassion.current) {
      const p = pendingPassion.current
      onZoomComplete(p)
    }
  }

  useEffect(() => {
    if (resetSignal > 0) {
      setSelected(null)
      setAvatarSelected(false)
      setZooming(false)
      setZoomTarget(null)
      pendingAvatar.current = false
    }
  }, [resetSignal])

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', touchAction: allowPanY ? 'pan-y' : 'none' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={1.0} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#E8D5B0" />
      <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={50} />
      <CinematicCamera
        target={zoomTarget}
        onZoomComplete={handleZoomComplete}
        resetSignal={resetSignal}
      />
      <SceneContent
        passions={passions}
        positions={positions}
        selected={selected}
        zooming={zooming}
        onSelect={handleSelect}
        onAvatarClick={handleAvatarClick}
        avatarSelected={avatarSelected}
        avatarUrl={avatarUrl}
      />
    </Canvas>
  )
}

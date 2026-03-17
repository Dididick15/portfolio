'use client'

import { useRef, useState, Suspense, Component, ReactNode, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Mesh, Group, MeshStandardMaterial, Color } from 'three'

interface PassionNodeProps {
  position: [number, number, number]
  color: string
  emoji?: string
  name: string
  modelUrl?: string
  useModelColor?: boolean
  phaseOffset: number
  onSelect: () => void
  isSelected: boolean
  anySelected?: boolean
  frozen?: boolean
}

const GEOMETRIES = [
  <icosahedronGeometry args={[0.48, 0]} />,
  <octahedronGeometry args={[0.52, 0]} />,
  <dodecahedronGeometry args={[0.42, 0]} />,
  <tetrahedronGeometry args={[0.56, 0]} />,
]

// Floating puro: solo oscillazione sinusoidale lenta, nessuna fisica
const FLOAT_AMP   = 0.06  // ampiezza verticale (unità scene)
const FLOAT_SPEED = 0.4   // velocità oscillazione

function PassionGLB({ url, color, useModelColor }: { url: string; color: string; useModelColor?: boolean }) {
  const { scene } = useGLTF(url)

  useEffect(() => {
    if (useModelColor) return
    const c = new Color(color)
    scene.traverse((obj) => {
      const mesh = obj as Mesh
      if (!mesh.isMesh) return
      mesh.material = new MeshStandardMaterial({
        color: c,
        emissive: c,
        emissiveIntensity: 0.15,
        roughness: 0.4,
        metalness: 0.1,
      })
    })
  }, [scene, color, useModelColor])

  return <primitive object={scene} dispose={null} scale={0.6} />
}

class GLBErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export function PassionNode({
  position, color, modelUrl, useModelColor = false,
  phaseOffset, onSelect, isSelected, anySelected = false, frozen = false,
}: PassionNodeProps) {
  const groupRef   = useRef<Group>(null)
  const meshRef    = useRef<Mesh>(null)
  const glbRef     = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  // Drag-to-rotate (solo quando selezionato)
  const dragRef = useRef<{ active: boolean; lastX: number; lastY: number }>({ active: false, lastX: 0, lastY: 0 })
  const userRotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const geomIndex = Math.abs(position[0] + position[1]) % GEOMETRIES.length | 0

  useEffect(() => {
    if (!isSelected) {
      userRotRef.current = { x: 0, y: 0 }
      dragRef.current.active = false
    }
  }, [isSelected])

  useFrame(({ clock }) => {
    if (!groupRef.current || frozen) return

    // Se selezionato: fermo esattamente nella sua posizione
    if (isSelected) {
      groupRef.current.position.set(position[0], position[1], position[2])
    } else {
      const t = clock.elapsedTime * FLOAT_SPEED + phaseOffset
      groupRef.current.position.set(
        position[0],
        position[1] + Math.sin(t) * FLOAT_AMP,
        position[2],
      )
    }

    // Rotazione: drag utente se selezionato, lenta auto altrimenti
    const rotTarget = glbRef.current ?? meshRef.current
    if (rotTarget) {
      if (isSelected) {
        rotTarget.rotation.x += (userRotRef.current.x - rotTarget.rotation.x) * 0.12
        rotTarget.rotation.y += (userRotRef.current.y - rotTarget.rotation.y) * 0.12
        rotTarget.rotation.z += (0 - rotTarget.rotation.z) * 0.06
      } else {
        rotTarget.rotation.y += 0.005
      }
    }

    // Scala gruppo intero (include label HTML)
    const visScale = anySelected && !isSelected ? 0 : 1.0
    const gs = groupRef.current.scale.x
    groupRef.current.scale.setScalar(gs + (visScale - gs) * 0.08)

    // Scala interna per hover/selezione
    const innerRef = glbRef.current ?? meshRef.current
    if (innerRef) {
      const targetScale = isSelected ? 1.6 : hovered ? 1.25 : 1.0
      const cs = innerRef.scale.x
      innerRef.scale.setScalar(cs + (targetScale - cs) * 0.08)
    }
  })

  const placeholder = (
    <mesh
      ref={meshRef}
      onClick={onSelect}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      castShadow
    >
      {GEOMETRIES[geomIndex]}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isSelected ? 1.2 : hovered ? 0.7 : 0.15}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  )

  const handlePointerDown = (e: { nativeEvent: PointerEvent }) => {
    if (!isSelected) return
    dragRef.current = { active: true, lastX: e.nativeEvent.clientX, lastY: e.nativeEvent.clientY }
    document.body.style.cursor = 'grabbing'
    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current.active) return
      const dx = ev.clientX - dragRef.current.lastX
      const dy = ev.clientY - dragRef.current.lastY
      userRotRef.current.y += dx * 0.01
      userRotRef.current.x += dy * 0.01
      dragRef.current.lastX = ev.clientX
      dragRef.current.lastY = ev.clientY
    }
    const onUp = () => {
      dragRef.current.active = false
      document.body.style.cursor = 'auto'
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => { if (!dragRef.current.active) { e.stopPropagation(); onSelect() } }}
      onPointerDown={handlePointerDown}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = isSelected ? 'grab' : 'pointer' }}
      onPointerOut={() => { setHovered(false); if (!dragRef.current.active) document.body.style.cursor = 'auto' }}
    >
      {modelUrl ? (
        <GLBErrorBoundary fallback={placeholder}>
          <Suspense fallback={placeholder}>
            <group ref={glbRef}>
              <PassionGLB url={modelUrl} color={color} useModelColor={useModelColor} />
            </group>
          </Suspense>
        </GLBErrorBoundary>
      ) : placeholder}

    </group>
  )
}

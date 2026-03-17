'use client'

import { useRef, Suspense, Component, ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'

type DragRef = { active: boolean; lastX: number; lastY: number }
type RotRef  = { x: number; y: number }

function AvatarGLB({ url, isSelected, userRotRef }: {
  url: string
  isSelected: boolean
  userRotRef: React.RefObject<RotRef>
}) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    if (isSelected) {
      groupRef.current.position.y = 0
      groupRef.current.rotation.x += (userRotRef.current!.x - groupRef.current.rotation.x) * 0.12
      groupRef.current.rotation.y += (userRotRef.current!.y - groupRef.current.rotation.y) * 0.12
    } else {
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08
      groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.06
      groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.06
    }
  })

  return <primitive ref={groupRef} object={scene} dispose={null} />
}

function AvatarGeometry() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0.3, 0]} castShadow>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#1B4332" roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.95, 0]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.15, 8]} />
        <meshStandardMaterial color="#0f2b1f" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.4, 0.55, 0.7, 8]} />
        <meshStandardMaterial color="#1B4332" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  )
}

class GLBErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

interface AvatarPlaceholderProps {
  avatarUrl?: string | null
  hidden?: boolean
  isSelected?: boolean
  onAvatarClick?: () => void
}

export function AvatarPlaceholder({ avatarUrl, hidden = false, isSelected = false, onAvatarClick }: AvatarPlaceholderProps) {
  const groupRef   = useRef<Group>(null)
  const dragRef    = useRef<DragRef>({ active: false, lastX: 0, lastY: 0 })
  const userRotRef = useRef<RotRef>({ x: 0, y: 0 })

  useFrame(() => {
    if (!groupRef.current) return
    const target = hidden ? 0 : 1
    const cur = groupRef.current.scale.x
    groupRef.current.scale.setScalar(cur + (target - cur) * 0.08)

    if (!isSelected) {
      userRotRef.current.x = 0
      userRotRef.current.y = 0
    }
  })

  const handlePointerDown = (e: { nativeEvent: PointerEvent }) => {
    if (!isSelected) return
    dragRef.current = { active: true, lastX: e.nativeEvent.clientX, lastY: e.nativeEvent.clientY }
    document.body.style.cursor = 'grabbing'
    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current.active) return
      userRotRef.current.y += (ev.clientX - dragRef.current.lastX) * 0.01
      userRotRef.current.x += (ev.clientY - dragRef.current.lastY) * 0.01
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
      onClick={(e) => { if (!dragRef.current.active) { e.stopPropagation(); onAvatarClick?.() } }}
      onPointerDown={handlePointerDown}
      onPointerOver={() => { document.body.style.cursor = isSelected ? 'grab' : (onAvatarClick ? 'pointer' : 'auto') }}
      onPointerOut={() => { if (!dragRef.current.active) document.body.style.cursor = 'auto' }}
    >
      <pointLight position={[0, 0.5, 1.2]} intensity={12} color="#fff8ee" distance={7} />
      <pointLight position={[-1.0, 0.2, 1.0]} intensity={12} color="#dce8ff" distance={5} />
      <pointLight position={[0, 2.0, -0.3]} intensity={3} color="#ffffff" distance={4} />

      {avatarUrl ? (
        <GLBErrorBoundary fallback={<AvatarGeometry />}>
          <Suspense fallback={<AvatarGeometry />}>
            <AvatarGLB url={avatarUrl} isSelected={isSelected} userRotRef={userRotRef} />
          </Suspense>
        </GLBErrorBoundary>
      ) : (
        <AvatarGeometry />
      )}
    </group>
  )
}

'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'

export function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.0005
    pointsRef.current.rotation.x += 0.0002
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7C5CFC"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
}

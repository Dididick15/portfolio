'use client'

import { useMemo } from 'react'
import { Vector3, CatmullRomCurve3 } from 'three'

interface ConnectionLinesProps {
  targets: [number, number, number][]
  activeIndex: number | null
}

export function ConnectionLines({ targets, activeIndex }: ConnectionLinesProps) {
  const lines = useMemo(() =>
    targets.map((pos, i) => {
      const curve = new CatmullRomCurve3([
        new Vector3(0, 0, 0),
        new Vector3(pos[0] * 0.5, pos[1] * 0.5, pos[2] * 0.3),
        new Vector3(...pos),
      ])
      const points = curve.getPoints(30)
      const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))
      return { positions, active: activeIndex === i }
    }),
  [targets, activeIndex])

  return (
    <>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[line.positions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#ffffff"
            opacity={line.active ? 0.4 : 0.1}
            transparent
          />
        </line>
      ))}
    </>
  )
}

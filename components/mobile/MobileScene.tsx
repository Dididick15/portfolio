'use client'

import dynamic from 'next/dynamic'
import { useState, useCallback, useRef, useEffect } from 'react'
import { Loader } from '@/components/ui/Loader'
import { TapHint } from './TapHint'
import { ScrollDownHint } from './ScrollDownHint'
import type { PassionData } from '@/app/HomeClient'

// Rombo: top, dx, sx, bottom — ottimizzato per canvas portrait
const MOBILE_DEFAULT_POSITIONS: [number, number, number][] = [
  [ 0,    1.8, 0],
  [ 1.5,  0,   0],
  [-1.5,  0,   0],
  [ 0,   -1.8, 0],
]

const Scene3D = dynamic(
  () => import('@/components/scene/Scene3D').then(m => m.Scene3D),
  { ssr: false }
)

interface MobileSceneProps {
  passions: PassionData[]
  avatarUrl?: string | null
  accentColor?: string
  resetSignal: number
  onPassionZoomed: (p: PassionData) => void
  onAvatarClick?: () => void
}

export function MobileScene({ passions, avatarUrl, accentColor, resetSignal, onPassionZoomed, onAvatarClick }: MobileSceneProps) {
  const [loading, setLoading] = useState(true)
  const [sceneProgress, setSceneProgress] = useState(0)
  const [showTapHint, setShowTapHint] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)

  // R3F forza touch-action:none sul canvas — lo sovrascriviamo dopo il mount
  // per permettere lo scroll verticale del container padre
  useEffect(() => {
    const wrapper = canvasWrapperRef.current
    if (!wrapper) return
    const canvas = wrapper.querySelector('canvas')
    if (canvas) canvas.style.touchAction = 'pan-y'
    // Riapplica se il canvas viene ricreato (hot reload, Suspense)
    const observer = new MutationObserver(() => {
      const c = wrapper.querySelector('canvas')
      if (c && c.style.touchAction !== 'pan-y') c.style.touchAction = 'pan-y'
    })
    observer.observe(wrapper, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  const handleLoadComplete = useCallback(() => {
    setLoading(false)
    setTimeout(() => setShowTapHint(true), 300)
  }, [])

  const handleDismissTapHint = useCallback(() => setShowTapHint(false), [])

  const handleZoomComplete = useCallback((p: PassionData) => {
    setShowTapHint(false)
    setShowScrollHint(true)
    onPassionZoomed(p)
  }, [onPassionZoomed])

  const handleAvatarZoom = useCallback(() => {
    setShowTapHint(false)
    setShowScrollHint(true)
    onAvatarClick?.()
  }, [onAvatarClick])

  const color = accentColor ?? '#5A9B7A'

  return (
    <section style={{
      height: '100dvh',
      scrollSnapAlign: 'start',
      position: 'relative',
      background: '#050510',
    }}>
      {/* Background nebula blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 300, height: 300,
          background: `radial-gradient(ellipse, ${color}22 0%, transparent 70%)`,
          borderRadius: '50%',
          transition: 'background 1s ease',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '15%',
          width: 200, height: 200,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* 3D Scene */}
      <div ref={canvasWrapperRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Scene3D
          avatarUrl={avatarUrl}
          passions={passions}
          onPassionSelect={() => {}}
          onZoomComplete={handleZoomComplete}
          onAvatarClick={handleAvatarZoom}
          resetSignal={resetSignal}
          onProgress={setSceneProgress}
          allowPanY
          fov={75}
          mobilePositions={passions.map((p, i) => {
            if (p.positionMX !== 0 || p.positionMY !== 0 || p.positionMZ !== 0)
              return [p.positionMX, p.positionMY, p.positionMZ] as [number, number, number]
            return MOBILE_DEFAULT_POSITIONS[i] ?? [0, 0, 0] as [number, number, number]
          })}
        />
      </div>

      {/* Loader */}
      {loading && (
        <Loader contained onComplete={handleLoadComplete} externalProgress={sceneProgress} />
      )}

      {/* Tap hint */}
      <TapHint visible={showTapHint} onDismiss={handleDismissTapHint} />

      {/* Scroll down hint */}
      <ScrollDownHint visible={showScrollHint && !loading} />
    </section>
  )
}

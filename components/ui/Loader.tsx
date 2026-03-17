'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LoaderProps {
  onComplete?: () => void
  duration?: number
  contained?: boolean
  externalProgress?: number  // 0-100, se fornito guida la barra reale
}

export function Loader({ onComplete, duration = 2800, contained = false, externalProgress }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (externalProgress === undefined) {
      // Modalità timer simulato (comportamento originale)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsComplete(true)
            setTimeout(() => onComplete?.(), 500)
            return 100
          }
          return prev + 1
        })
      }, duration / 100)
      return () => clearInterval(interval)
    }
  }, [duration, onComplete, externalProgress])

  // Quando externalProgress è fornito, segui quello
  useEffect(() => {
    if (externalProgress === undefined) return
    setProgress(externalProgress)
    if (externalProgress >= 100 && !isComplete) {
      setIsComplete(true)
      setTimeout(() => onComplete?.(), 500)
    }
  }, [externalProgress, isComplete, onComplete])

  return (
    <div style={{
      position: contained ? 'absolute' : 'fixed', inset: 0, zIndex: 10,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a',
      opacity: isComplete ? 0 : 1,
      pointerEvents: isComplete ? 'none' : 'auto',
      transition: 'opacity 0.5s ease',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(ellipse, rgba(90,155,122,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300, height: 300,
          background: 'radial-gradient(ellipse, rgba(124,92,252,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Logo */}
      <div style={{ position: 'relative', marginBottom: 48, width: 180, height: 180 }}>
        <Image
          src="/images/logo-didi-vett.png"
          alt="Logo"
          fill
          style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 28px rgba(90,155,122,0.55))' }}
          priority
        />
      </div>

      {/* Progress section */}
      <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Bar */}
        <div style={{
          height: 6, borderRadius: 999,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0, left: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #4B7A63, #5A9B7A, #4B7A63)',
            borderRadius: 999,
            boxShadow: '0 0 10px rgba(90,155,122,0.6)',
            transition: 'width 0.1s ease-out',
          }} />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 10, color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', letterSpacing: '0.2em',
          }}>Loading</span>
          <span style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 12, color: '#5A9B7A', fontWeight: 600,
          }}>{progress}%</span>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 4 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'rgba(90,155,122,0.6)',
              animation: 'bounce 1s infinite',
              animationDelay: `${i * 150}ms`,
            }} />
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <p style={{
        position: 'absolute', bottom: 32,
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10, color: 'rgba(255,255,255,0.2)',
        textTransform: 'uppercase', letterSpacing: '0.3em',
      }}>Davide Dickmann</p>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

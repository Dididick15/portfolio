'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MobileHero } from './MobileHero'
import { MobileScene } from './MobileScene'
import { MobileProjects } from './MobileProjects'
import type { PassionData, ProjectData } from '@/app/HomeClient'

interface SiteConfig {
  ownerName?: string | null
  title?: string | null
}

interface MobileLayoutProps {
  avatarUrl?: string | null
  passions: PassionData[]
  projects: ProjectData[]
  siteConfig?: SiteConfig | null
}

export function MobileLayout({ avatarUrl, passions, projects, siteConfig }: MobileLayoutProps) {
  const [activePassion, setActivePassion] = useState<PassionData | null>(null)
  const [resetSignal, setResetSignal] = useState(0)

  const handlePassionZoomed = useCallback((p: PassionData) => {
    setActivePassion(p)
  }, [])

  const handleBack = useCallback(() => {
    setActivePassion(null)
    setResetSignal(s => s + 1)
  }, [])

  const passionProjects = activePassion
    ? projects.filter(p => p.passionId === activePassion.id)
    : []

  return (
    <div style={{
      height: '100dvh',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
      background: '#0D0D0D',
    }}>
      <MobileHero
        ownerName={siteConfig?.ownerName}
        title={siteConfig?.title}
      />

      <MobileScene
        passions={passions}
        avatarUrl={avatarUrl}
        accentColor={activePassion?.color}
        resetSignal={resetSignal}
        onPassionZoomed={handlePassionZoomed}
      />

      <AnimatePresence mode="wait">
        {activePassion && (
          <MobileProjects
            key={activePassion.id}
            passion={activePassion}
            projects={passionProjects}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

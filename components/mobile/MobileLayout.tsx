'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MobileHero } from './MobileHero'
import { MobileScene } from './MobileScene'
import { MobileProjects } from './MobileProjects'
import { MobileAbout } from './MobileAbout'
import type { PassionData, ProjectData } from '@/app/HomeClient'

interface SiteConfig {
  ownerName?: string | null
  title?: string | null
  bio?: string | null
  bioLong?: string | null
  location?: string | null
  availableForWork?: boolean
  cvUrl?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  instagramUrl?: string | null
  emailContact?: string | null
}

interface MobileLayoutProps {
  avatarUrl?: string | null
  passions: PassionData[]
  projects: ProjectData[]
  siteConfig?: SiteConfig | null
}

type ActiveSection = { type: 'passion'; passion: PassionData } | { type: 'about' } | null

export function MobileLayout({ avatarUrl, passions, projects, siteConfig }: MobileLayoutProps) {
  const [active, setActive] = useState<ActiveSection>(null)
  const [resetSignal, setResetSignal] = useState(0)

  const handlePassionZoomed = useCallback((p: PassionData) => {
    setActive({ type: 'passion', passion: p })
  }, [])

  const handleAvatarClick = useCallback(() => {
    setActive({ type: 'about' })
  }, [])

  const handleBack = useCallback(() => {
    setActive(null)
    setResetSignal(s => s + 1)
  }, [])

  const passionProjects = active?.type === 'passion'
    ? projects.filter(p => p.passionId === active.passion.id)
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
        accentColor={active?.type === 'passion' ? active.passion.color : undefined}
        resetSignal={resetSignal}
        onPassionZoomed={handlePassionZoomed}
        onAvatarClick={handleAvatarClick}
      />

      <AnimatePresence mode="wait">
        {active?.type === 'passion' && (
          <MobileProjects
            key={active.passion.id}
            passion={active.passion}
            projects={passionProjects}
            onBack={handleBack}
          />
        )}
        {active?.type === 'about' && (
          <MobileAbout
            key="about"
            config={siteConfig ?? {}}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

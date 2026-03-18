'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectsSidebar } from '@/components/ui/ProjectsSidebar'
import { AboutSidebar } from '@/components/ui/AboutSidebar'
import { ProjectDetailSidebar } from '@/components/ui/ProjectDetailSidebar'
import { Loader } from '@/components/ui/Loader'
import { useIsMobile } from '@/hooks/useIsMobile'
import { MobileLayout } from '@/components/mobile/MobileLayout'

const Scene3D = dynamic(
  () => import('@/components/scene/Scene3D').then(m => m.Scene3D),
  { ssr: false }
)

export interface PassionData {
  id: string
  name: string
  emoji?: string | null
  color: string
  modelUrl?: string | null
  useModelColor?: boolean
  positionX: number
  positionY: number
  positionZ: number
  positionMX: number
  positionMY: number
  positionMZ: number
}

export interface ProjectData {
  id: string
  passionId: string
  title: string
  description: string
  longDesc?: string | null
  coverImage?: string | null
  images: string[]
  tags: string[]
  externalUrl?: string | null
}

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
  tags?: string[]
}

interface HomeClientProps {
  avatarUrl?: string | null
  passions: PassionData[]
  siteConfig?: SiteConfig | null
  projects: ProjectData[]
}

function DesktopHome({ avatarUrl, passions, siteConfig, projects }: HomeClientProps) {
  const [loading, setLoading] = useState(false)
  const [sceneProgress, setSceneProgress] = useState(0)
  useEffect(() => setLoading(true), [])
  const [activePassion, setActivePassion] = useState<PassionData | null>(null)
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [resetSignal, setResetSignal] = useState(0)

  const handleClose = () => {
    setActivePassion(null)
    setAboutOpen(false)
    setResetSignal(s => s + 1)
  }

  const activeProjects = useMemo(
    () => activePassion ? projects.filter(p => p.passionId === activePassion.id) : [],
    [activePassion, projects]
  )

  const handleZoomComplete = (passion: PassionData) => setActivePassion(passion)
  const accentColor = activePassion?.color ?? '#7C5CFC'

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0D0D0D' }}>
      {/* Colonna sinistra — intro / about / progetti */}
      <AnimatePresence mode="wait">
        {!activePassion && !aboutOpen ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 64px',
              flexShrink: 0,
              background: '#111111',
              borderRight: '1px solid #222',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '10px',
              color: '#4B7A63',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              margin: '0 0 24px',
            }}>
              ◈ Portfolio — 2026
            </p>
            <h1 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(48px, 5.5vw, 80px)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 0.95,
              color: '#F0EDE8',
              letterSpacing: '-0.03em',
            }}>
              Davide<br />Dickmann
            </h1>
            <p style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(13px, 1.3vw, 17px)',
              color: '#5A9B7A',
              margin: '20px 0 0',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Software Developer
            </p>

            {(siteConfig?.tags?.length ?? 0) > 0 && (
              <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {siteConfig!.tags!.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    border: '1px solid rgba(255,255,255,0.35)',
                    background: 'transparent',
                    color: '#F0EDE8',
                    letterSpacing: '0.08em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: '72px', borderTop: '1px solid #222', paddingTop: '28px' }}>
              <motion.p
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '13px',
                  color: '#4B7A63',
                  margin: 0,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                }}
              >
                Clicca su uno degli asset →
              </motion.p>
            </div>
          </motion.div>
        ) : aboutOpen ? (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '50%', height: '100%', flexShrink: 0 }}
          >
            <AboutSidebar
              open={true}
              onClose={handleClose}
              config={siteConfig ?? {}}
            />
          </motion.div>
        ) : activePassion ? (
          <motion.div
            key="projects"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '50%', height: '100%', flexShrink: 0 }}
          >
            <ProjectsSidebar
              passion={activePassion}
              projects={activeProjects}
              onClose={handleClose}
              onProjectClick={setActiveProject}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Colonna destra — scena 3D */}
      <div style={{ flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {loading && <Loader onComplete={() => setLoading(false)} contained externalProgress={sceneProgress} />}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: '#0D0D0D',
          transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '70%', height: '70%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}3A 0%, transparent 70%)`,
            transition: 'background 1.2s cubic-bezier(0.16,1,0.3,1)',
          }} />
          <div style={{
            position: 'absolute',
            top: '-10%', right: '-5%',
            width: '55%', height: '55%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #7C5CFC30 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-15%', left: '-10%',
            width: '60%', height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #1B433230 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '10%', left: '-5%',
            width: '35%', height: '35%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #E8A87C22 0%, transparent 65%)',
          }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Scene3D
            avatarUrl={avatarUrl}
            passions={passions}
            onPassionSelect={() => {}}
            onZoomComplete={handleZoomComplete}
            onAvatarClick={() => setAboutOpen(true)}
            resetSignal={resetSignal}
            onProgress={setSceneProgress}
          />
        </div>
        <ProjectDetailSidebar
          project={activeProject}
          color={activePassion?.color ?? '#7C5CFC'}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </div>
  )
}

export default function HomeClient(props: HomeClientProps) {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileLayout {...props} />
  return <DesktopHome {...props} />
}

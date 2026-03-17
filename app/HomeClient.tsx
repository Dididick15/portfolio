'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectsSidebar } from '@/components/ui/ProjectsSidebar'
import { AboutSidebar } from '@/components/ui/AboutSidebar'

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
}

export interface ProjectMock {
  id: string
  title: string
  description: string
  coverImage?: string | null
  tags: string[]
  externalUrl?: string | null
  year: number
}

interface ActivePassion {
  name: string
  emoji?: string
  color: string
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
}

interface HomeClientProps {
  avatarUrl?: string | null
  passions: PassionData[]
  siteConfig?: SiteConfig | null
}

// Dati mock — fotografia
const MOCK_PROJECTS: Record<string, ProjectMock[]> = {
  'Fotografia': [
    {
      id: '1',
      title: 'Golden Hour Milano',
      description: 'Serie di scatti al tramonto per le strade di Milano: Navigli, Brera, Duomo. Luce calda, ombre lunghe, contrasti forti.',
      coverImage: null,
      tags: ['Street', 'Golden Hour', 'Milano'],
      externalUrl: null,
      year: 2024,
    },
    {
      id: '2',
      title: 'Portrait Series Vol.1',
      description: 'Ritratti in studio con luce naturale diffusa. Focus sull\'espressione e la texture della pelle. 12 soggetti diversi.',
      coverImage: null,
      tags: ['Portrait', 'Studio', 'B&W'],
      externalUrl: null,
      year: 2024,
    },
    {
      id: '3',
      title: 'Urban Geometry',
      description: 'Architettura urbana come soggetto astratto: linee, simmetrie, prospettive insolite nelle città italiane.',
      coverImage: null,
      tags: ['Architecture', 'Abstract', 'Urban'],
      externalUrl: null,
      year: 2023,
    },
    {
      id: '4',
      title: 'Persone in Movimento',
      description: 'Long exposure in luoghi affollati — stazioni, mercati, piazze. Il flusso umano come pennellata di luce.',
      coverImage: null,
      tags: ['Long Exposure', 'Motion', 'Street'],
      externalUrl: null,
      year: 2023,
    },
  ],
  'Videogiochi': [
    {
      id: '5',
      title: 'Indie Game Jam 2024',
      description: 'Gioco 2D platformer realizzato in 48h durante una jam. Engine: Godot 4, grafica pixel art.',
      coverImage: null,
      tags: ['Godot', 'Pixel Art', 'Jam'],
      externalUrl: null,
      year: 2024,
    },
    {
      id: '6',
      title: 'Shader Collection',
      description: 'Raccolta di shader GLSL ispirati ai videogiochi retro. Scanlines, CRT glow, dithering, palette swap.',
      coverImage: null,
      tags: ['GLSL', 'Shader', 'Retro'],
      externalUrl: null,
      year: 2023,
    },
  ],
  'Grafica': [
    {
      id: '7',
      title: 'Brand Identity — DoubledLab',
      description: 'Logo, palette, tipografia e motion identity per il progetto DoubledLab. Ispirato alla dualità e alla simmetria.',
      coverImage: null,
      tags: ['Branding', 'Logo', 'Motion'],
      externalUrl: null,
      year: 2024,
    },
    {
      id: '8',
      title: 'Poster Series — Syntwave',
      description: 'Serie di 6 poster in stile synthwave per artisti indipendenti. Neon, griglia, sunsets.',
      coverImage: null,
      tags: ['Poster', 'Synthwave', 'Illustrator'],
      externalUrl: null,
      year: 2023,
    },
  ],
  'Cucina': [
    {
      id: '9',
      title: 'Pasta da Zero',
      description: 'Documentazione fotografica e ricette del processo di fare pasta fresca artigianale: tagliatelle, ravioli, pici.',
      coverImage: null,
      tags: ['Pasta', 'Artigianale', 'Ricette'],
      externalUrl: null,
      year: 2024,
    },
    {
      id: '10',
      title: 'Fermentazione Creativa',
      description: 'Esperimenti con lievito madre, kimchi, kombucha e formaggi stagionati fatti in casa.',
      coverImage: null,
      tags: ['Fermentazione', 'DIY', 'Esperimenti'],
      externalUrl: null,
      year: 2024,
    },
  ],
}

export default function HomeClient({ avatarUrl, passions, siteConfig }: HomeClientProps) {
  const [activePassion, setActivePassion] = useState<ActivePassion | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [resetSignal, setResetSignal] = useState(0)

  const handleClose = () => {
    setActivePassion(null)
    setAboutOpen(false)
    setResetSignal(s => s + 1)
  }

  const projects = activePassion ? (MOCK_PROJECTS[activePassion.name] ?? []) : []

  // Colore accent che cambia con la passione attiva
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
              fontSize: 'clamp(60px, 7vw, 100px)',
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
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: '#5A9B7A',
              margin: '20px 0 0',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Software Developer
            </p>

            <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['React', 'Next.js', 'TypeScript', '3D/R3F'].map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '10px',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  border: '1px solid #2A2A2A',
                  background: '#1A1A1A',
                  color: '#555',
                  letterSpacing: '0.08em',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '72px', borderTop: '1px solid #222', paddingTop: '28px' }}>
              <p style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(15px, 1.5vw, 19px)',
                color: '#F0EDE8',
                margin: 0,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}>
                Clicca gli oggetti nello spazio
              </p>
              <p style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '10px',
                color: '#4B7A63',
                marginTop: '8px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                → Esplora le passioni a destra
              </p>
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
              projects={projects}
              onClose={handleClose}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Colonna destra — scena 3D (si allarga quando c'è passione attiva) */}
      <div style={{ flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Sfondo nebula dinamico */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: '#0D0D0D',
          transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {/* Blob centrale — cambia con la passione */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '70%', height: '70%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${accentColor}3A 0%, transparent 70%)`,
            transition: 'background 1.2s cubic-bezier(0.16,1,0.3,1)',
          }} />
          {/* Blob viola top-right fisso */}
          <div style={{
            position: 'absolute',
            top: '-10%', right: '-5%',
            width: '55%', height: '55%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #7C5CFC30 0%, transparent 65%)',
          }} />
          {/* Blob teal bottom-left fisso */}
          <div style={{
            position: 'absolute',
            bottom: '-15%', left: '-10%',
            width: '60%', height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #1B433230 0%, transparent 65%)',
          }} />
          {/* Blob ambra top-left fisso */}
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
            onZoomComplete={setActivePassion}
            onAvatarClick={() => setAboutOpen(true)}
            resetSignal={resetSignal}
          />
        </div>
      </div>
    </div>
  )
}

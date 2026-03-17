'use client'

import { motion } from 'framer-motion'
import { useRef, useState, MouseEvent } from 'react'
import type { ProjectMock } from '@/app/HomeClient'

interface Passion {
  name: string
  emoji?: string
  color: string
}

interface ProjectsSidebarProps {
  passion: Passion
  projects: ProjectMock[]
  onClose: () => void
}

export function ProjectsSidebar({ passion, projects, onClose }: ProjectsSidebarProps) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#111111',
      borderRight: '1px solid #222',
    }}>
      {/* Header */}
      <div style={{
        padding: '32px 48px 28px',
        borderBottom: '1px solid #1E1E1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '10px',
            color: '#4B7A63',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            margin: '0 0 10px',
          }}>
            ◈ Passione
          </p>
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            fontWeight: 800,
            color: passion.color,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            {passion.emoji && <span style={{ marginRight: '12px' }}>{passion.emoji}</span>}
            {passion.name}
          </h2>
        </div>

        <button
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '10px',
            fontWeight: 700,
            color: '#555',
            background: 'none',
            border: '1px solid #2A2A2A',
            borderRadius: '3px',
            padding: '8px 16px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#F0EDE8'
            e.currentTarget.style.borderColor = '#444'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#555'
            e.currentTarget.style.borderColor = '#2A2A2A'
          }}
        >
          ← Torna
        </button>
      </div>

      {/* Lista progetti */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 48px 40px' }}>
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '10px',
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          margin: '0 0 24px',
        }}>
          {projects.length} progetti
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              color={passion.color}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, color, index }: { project: ProjectMock; color: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => project.externalUrl && window.open(project.externalUrl, '_blank')}
        style={{
          position: 'relative',
          background: hovered ? '#1A1A1A' : '#161616',
          border: `1px solid ${hovered ? color + '40' : '#222'}`,
          borderRadius: '6px',
          overflow: 'hidden',
          cursor: project.externalUrl ? 'pointer' : 'default',
          boxShadow: hovered ? `0 8px 32px ${color}12` : 'none',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}10 0%, transparent 65%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }} />
        )}

        {/* Bordo sinistro colorato */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '2px',
          background: color,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.25s',
        }} />

        <div style={{ padding: '18px 20px 18px 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h3 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#F0EDE8',
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}>
              {project.title}
            </h3>
            <span style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '10px',
              color: '#333',
              marginLeft: '12px',
              flexShrink: 0,
            }}>
              {project.year}
            </span>
          </div>

          <p style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '13px',
            color: '#555',
            margin: '0 0 14px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '9px',
                color: color,
                background: color + '12',
                border: `1px solid ${color}25`,
                padding: '3px 8px',
                borderRadius: '3px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

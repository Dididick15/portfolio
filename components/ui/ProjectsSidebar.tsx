'use client'

import { motion } from 'framer-motion'
import { useRef, useState, MouseEvent } from 'react'
import type { PassionData, ProjectData } from '@/app/HomeClient'

interface ProjectsSidebarProps {
  passion: PassionData
  projects: ProjectData[]
  onClose: () => void
  onProjectClick: (project: ProjectData) => void
}

export function ProjectsSidebar({ passion, projects, onClose, onProjectClick }: ProjectsSidebarProps) {
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

      {/* Griglia progetti */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 40px 40px' }}>
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '10px',
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          margin: '0 0 20px',
        }}>
          {projects.length} progetti
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              color={passion.color}
              index={i}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, color, index, onClick }: { project: ProjectData; color: string; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width  // 0..1
    const cy = (e.clientY - rect.top) / rect.height   // 0..1
    setTilt({ x: (cy - 0.5) * -18, y: (cx - 0.5) * 18 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '800px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: `1px solid ${hovered ? color + '50' : '#222'}`,
          boxShadow: hovered
            ? `0 16px 40px ${color}18, 0 4px 12px rgba(0,0,0,0.5)`
            : '0 2px 8px rgba(0,0,0,0.4)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateZ(8px)' : 'translateZ(0)'}`,
          transition: hovered
            ? 'border-color 0.2s, box-shadow 0.2s'
            : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {/* Immagine copertina */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          background: project.coverImage ? 'transparent' : '#161616',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, #161616 0%, ${color}18 100%)`,
            }}>
              <span style={{ fontSize: '32px', opacity: 0.4 }}>◈</span>
            </div>
          )}

          {/* Glow overlay al mouse */}
          {hovered && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}28 0%, transparent 65%)`,
              pointerEvents: 'none',
            }} />
          )}

          {/* Gradiente bottom per leggibilità */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(17,17,17,0.95) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Info */}
        <div style={{ padding: '18px 20px 20px', background: '#111111' }}>
          <h3 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#F0EDE8',
            margin: '0 0 8px',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '14px',
            color: '#888',
            margin: '0 0 12px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '10px',
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

        {/* Bordo highlight superiore a tilt */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }} />
      </div>
    </motion.div>
  )
}

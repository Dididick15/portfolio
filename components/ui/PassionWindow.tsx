'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, MouseEvent } from 'react'

function darken(hex: string, amount = 0.35): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (n >> 16) - Math.round(255 * amount))
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(255 * amount))
  const b = Math.max(0, (n & 0xff) - Math.round(255 * amount))
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`
}

interface Project {
  id: string
  title: string
  description: string
  coverImage?: string | null
  tags: string[]
  externalUrl?: string | null
}

interface Passion {
  name: string
  emoji?: string
  color: string
  description?: string
  projects?: Project[]
}

interface PassionWindowProps {
  passion: Passion | null
  onClose: () => void
}

export function PassionWindow({ passion, onClose }: PassionWindowProps) {
  return (
    <AnimatePresence>
      {passion && (
        <motion.div
          key="window"
          initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 1 }}
          animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1 }}
          exit={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 30,
            background: darken(passion.color, 0.58),
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Barra superiore */}
          <div style={{
            background: passion.color,
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderBottom: `4px solid ${darken(passion.color, 0.2)}`,
          }}>
            {/* Dot OS */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={onClose}
                style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: darken(passion.color, 0.25),
                  border: `2.5px solid ${darken(passion.color, 0.45)}`,
                  cursor: 'pointer',
                }}
              />
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${passion.color}88`, border: `2.5px solid ${darken(passion.color, 0.15)}` }} />
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${passion.color}88`, border: `2.5px solid ${darken(passion.color, 0.15)}` }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {passion.emoji && <span style={{ fontSize: '26px', lineHeight: 1 }}>{passion.emoji}</span>}
              <h2 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '20px',
                fontWeight: 900,
                color: darken(passion.color, 0.65),
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {passion.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: darken(passion.color, 0.55),
                background: 'none',
                border: `2px solid ${darken(passion.color, 0.3)}`,
                borderRadius: '8px',
                padding: '4px 14px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              ← Torna
            </button>
          </div>

          {/* Corpo scrollabile */}
          <div style={{ overflowY: 'auto', padding: '40px 48px', flex: 1 }}>
            {passion.description && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '16px',
                  color: `${passion.color}bb`,
                  margin: '0 0 36px',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                }}
              >
                {passion.description}
              </motion.p>
            )}

            {passion.projects && passion.projects.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '28px',
              }}>
                {passion.projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} color={passion.color} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{
                  textAlign: 'center',
                  padding: '60px',
                  color: `${passion.color}44`,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '14px',
                  border: `3px dashed ${passion.color}22`,
                  borderRadius: '16px',
                }}
              >
                Nessun progetto ancora — aggiungili dall&apos;admin
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ProjectCard({ project, color, index }: { project: Project; color: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width  // 0–1
    const py = (e.clientY - rect.top) / rect.height   // 0–1
    setTilt({ x: (py - 0.5) * -18, y: (px - 0.5) * 18 })
    setGlowPos({ x: px * 100, y: py * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.07, type: 'spring', stiffness: 280, damping: 22 }}
      style={{ perspective: '800px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => project.externalUrl && window.open(project.externalUrl, '_blank')}
        style={{
          position: 'relative',
          background: darken(color, 0.42),
          border: `3.5px solid ${color}`,
          borderRadius: '18px',
          overflow: 'hidden',
          cursor: project.externalUrl ? 'pointer' : 'default',
          // Ombra solida offset cartoon + ombra 3D
          boxShadow: hovered
            ? `6px 6px 0px ${darken(color, 0.65)}, 0 20px 40px ${color}22`
            : `5px 5px 0px ${darken(color, 0.6)}, 0 8px 20px ${color}18`,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateZ(8px)' : 'translateZ(0px)'}`,
          transition: hovered
            ? 'box-shadow 0.15s, transform 0.08s'
            : 'box-shadow 0.3s, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Riflesso speculare che segue il mouse */}
        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}22 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 2,
            borderRadius: '14px',
          }} />
        )}

        {/* Cover */}
        {project.coverImage ? (
          <div style={{
            height: '160px',
            background: `url(${project.coverImage}) center/cover`,
            borderBottom: `3.5px solid ${color}55`,
          }} />
        ) : (
          <div style={{
            height: '110px',
            background: `linear-gradient(135deg, ${color}18, ${color}08)`,
            borderBottom: `3.5px solid ${color}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            opacity: 0.5,
          }}>
            🖼️
          </div>
        )}

        <div style={{ padding: '18px', position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '15px',
            fontWeight: 800,
            color: color,
            margin: '0 0 8px',
            lineHeight: 1.3,
            // Piccolo text-shadow per effetto rilievo
            textShadow: `1px 2px 0px ${darken(color, 0.5)}`,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
            color: `${color}77`,
            margin: '0 0 14px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: darken(color, 0.6),
                  background: color,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  // Ombra solida sotto il tag — effetto 3D
                  boxShadow: `2px 2px 0px ${darken(color, 0.35)}`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

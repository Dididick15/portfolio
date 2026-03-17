'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ImageLightbox } from './ImageLightbox'
import type { ProjectData } from '@/app/HomeClient'

interface ProjectDetailSidebarProps {
  project: ProjectData | null
  color: string
  onClose: () => void
}

export function ProjectDetailSidebar({ project, color, onClose }: ProjectDetailSidebarProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allImages = project ? [
    ...(project.coverImage ? [project.coverImage] : []),
    ...project.images,
  ] : []

  const openLightbox = (src: string) => {
    const i = allImages.indexOf(src)
    if (i !== -1) setLightboxIndex(i)
  }

  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null)
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % allImages.length : null)
  return (
    <>
    <AnimatePresence>
      {project && (
        <motion.div
          key="panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0E0E0E',
            borderLeft: `1px solid ${color}30`,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 20,
            overflowY: 'auto',
          }}
        >
          {/* Immagine hero */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', flexShrink: 0 }}>
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                onClick={() => openLightbox(project.coverImage!)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, #161616 0%, ${color}25 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '64px', opacity: 0.15 }}>◈</span>
              </div>
            )}
            {/* Gradiente bottom */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '60%',
              background: 'linear-gradient(to top, #0E0E0E 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            {/* Pulsante chiudi */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#F0EDE8',
                fontSize: '22px',
                lineHeight: 1,
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              ×
            </button>
          </div>

          {/* Contenuto */}
          <div style={{ padding: '32px 48px 56px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Titolo + label */}
            <div>
              <p style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '11px',
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                margin: '0 0 12px',
              }}>
                ◈ Progetto
              </p>
              <h2 style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(32px, 3.5vw, 52px)',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}>
                {project.title}
              </h2>
            </div>

            {/* Descrizione lunga */}
            <p style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '17px',
              color: '#D0CCC8',
              margin: 0,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}>
              {project.longDesc ?? project.description}
            </p>

            {/* Tag */}
            {project.tags.length > 0 && (
              <div>
                <p style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '10px',
                  color: '#555',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  margin: '0 0 12px',
                }}>
                  Tech & Tag
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: '12px',
                      color: color,
                      background: color + '14',
                      border: `1px solid ${color}35`,
                      padding: '5px 12px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Galleria immagini extra */}
            {project.images.length > 0 && (
              <div>
                <p style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '10px',
                  color: '#555',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  margin: '0 0 12px',
                }}>
                  Gallery
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {project.images.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt={`${project.title} ${i + 1}`}
                      onClick={() => openLightbox(src)}
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '6px', display: 'block', cursor: 'zoom-in' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Link esterno */}
            {project.externalUrl && (
              <div style={{ paddingTop: '8px', borderTop: '1px solid #1E1E1E' }}>
                <a
                  href={/^https?:\/\//.test(project.externalUrl) ? project.externalUrl : `https://${project.externalUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    border: `1px solid ${color}50`,
                    padding: '14px 28px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    background: color + '18',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = color + '30'
                    e.currentTarget.style.borderColor = color + '80'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = color + '18'
                    e.currentTarget.style.borderColor = color + '50'
                  }}
                >
                  Visita il progetto ↗
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <ImageLightbox
      images={allImages}
      index={lightboxIndex}
      onClose={closeLightbox}
      onPrev={prevImage}
      onNext={nextImage}
    />
    </>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageLightbox } from '@/components/ui/ImageLightbox'

interface Project {
  id: string
  title: string
  description: string
  longDesc?: string | null
  coverImage?: string | null
  images: string[]
  tags: string[]
  externalUrl?: string | null
  passion: { id: string; name: string; color: string }
}

interface MobileProjectDetailProps {
  project: Project
}

export function MobileProjectDetail({ project }: MobileProjectDetailProps) {
  const router = useRouter()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allImages = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...project.images,
  ]

  const openLightbox = (src: string) => {
    const i = allImages.indexOf(src)
    if (i !== -1) setLightboxIndex(i)
  }
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null)
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % allImages.length : null)

  const color = project.passion.color

  return (
    <div style={{ minHeight: '100dvh', background: '#0E0E0E', overflowY: 'auto' }}>
      {/* Back button */}
      <button
        onClick={() => router.back()}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 50,
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10,
          color: '#888',
          background: 'rgba(14,14,14,0.85)',
          border: '1px solid #2A2A2A',
          borderRadius: 6,
          padding: '8px 14px',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          backdropFilter: 'blur(8px)',
        }}
      >
        ← Portfolio
      </button>

      {/* Hero image */}
      {project.coverImage && (
        <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', background: '#1A1A1A' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            onClick={() => openLightbox(project.coverImage!)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '24px 20px 48px' }}>
        {/* Passion label */}
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 10,
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: 10,
        }}>
          ◈ {project.passion.name}
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(26px, 7vw, 38px)',
          fontWeight: 700,
          color: '#F0EDE8',
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          {project.title}
        </h1>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontSize: 15,
          color: '#D0CCC8',
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          {project.longDesc ?? project.description}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 10,
                color,
                border: `1px solid ${color}40`,
                borderRadius: 4,
                padding: '4px 10px',
                letterSpacing: '0.08em',
              }}>{tag}</span>
            ))}
          </div>
        )}

        {/* Gallery */}
        {project.images.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {project.images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={img}
                alt={`${project.title} ${i + 1}`}
                onClick={() => openLightbox(img)}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  objectFit: 'cover',
                  cursor: 'zoom-in',
                  border: '1px solid #1E1E1E',
                }}
              />
            ))}
          </div>
        )}

        {/* External link */}
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '14px',
              background: color + '22',
              border: `1px solid ${color}40`,
              borderRadius: 8,
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 11,
              color,
              textAlign: 'center',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Apri Progetto →
          </a>
        )}
      </div>

      <ImageLightbox
        images={allImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  )
}

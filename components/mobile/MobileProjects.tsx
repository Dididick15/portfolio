'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import type { PassionData, ProjectData } from '@/app/HomeClient'

interface MobileProjectsProps {
  passion: PassionData
  projects: ProjectData[]
  onBack: () => void
}

export function MobileProjects({ passion, projects, onBack }: MobileProjectsProps) {
  const router = useRouter()

  return (
    <section style={{
      minHeight: '100dvh',
      scrollSnapAlign: 'start',
      background: '#111111',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 20px 16px',
        borderBottom: '1px solid #1E1E1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: '#111111',
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 20,
          fontWeight: 700,
          color: passion.color,
        }}>
          {passion.emoji} {passion.name}
        </span>
        <button
          onClick={onBack}
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 10,
            color: '#888',
            background: 'none',
            border: '1px solid #2A2A2A',
            borderRadius: 4,
            padding: '6px 12px',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          ← Torna
        </button>
      </div>

      {/* Projects list */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            onClick={() => router.push(`/projects/${project.id}`)}
            style={{
              display: 'flex',
              gap: 14,
              background: '#0E0E0E',
              border: '1px solid #1E1E1E',
              borderRadius: 10,
              overflow: 'hidden',
              cursor: 'pointer',
              padding: 12,
              alignItems: 'center',
            }}
          >
            {/* Cover image */}
            <div style={{
              width: 80, height: 80,
              borderRadius: 8,
              overflow: 'hidden',
              flexShrink: 0,
              background: '#1A1A1A',
              position: 'relative',
            }}>
              {project.coverImage ? (
                <Image src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: passion.color + '22' }} />
              )}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 15,
                fontWeight: 700,
                color: '#F0EDE8',
                marginBottom: 4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{project.title}</p>
              <p style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: 12,
                color: '#666',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

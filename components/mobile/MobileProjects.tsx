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
          {passion.name}
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
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            onClick={() => router.push(`/projects/${project.id}`)}
            style={{
              background: '#0E0E0E',
              border: '1px solid #1E1E1E',
              borderRadius: 12,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Cover image */}
            <div style={{
              width: '100%',
              height: 180,
              background: '#1A1A1A',
              position: 'relative',
            }}>
              {project.coverImage ? (
                <Image src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: passion.color + '22' }} />
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '14px 16px 16px' }}>
              <p style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 17,
                fontWeight: 700,
                color: '#F0EDE8',
                marginBottom: 6,
              }}>{project.title}</p>

              <p style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: 13,
                color: '#888',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: project.tags.length > 0 ? 10 : 0,
              }}>{project.description}</p>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {project.tags.slice(0, 5).map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: 10,
                      color: passion.color,
                      border: `1px solid ${passion.color}44`,
                      borderRadius: 4,
                      padding: '2px 7px',
                      letterSpacing: '0.05em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

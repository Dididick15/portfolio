'use client'

interface AboutSidebarProps {
  open?: boolean
  onClose: () => void
  config: {
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
}

export function AboutSidebar({ onClose, config }: AboutSidebarProps) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#111111',
      borderRight: '1px solid #222',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '32px 48px 28px',
        borderBottom: '1px solid #1E1E1E',
        display: 'flex',
        alignItems: 'flex-start',
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
            ◈ Chi sono
          </p>
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            fontWeight: 800,
            color: '#F0EDE8',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            {config.ownerName ?? 'Davide Dickmann'}
          </h2>
          {config.title && (
            <p style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '14px',
              color: '#5A9B7A',
              margin: '8px 0 0',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {config.title}
            </p>
          )}
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
            flexShrink: 0,
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

      {/* Body */}
      <div style={{ padding: '36px 48px 48px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Badge disponibilità + location */}
        {(config.availableForWork || config.location) && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {config.availableForWork && (
              <span style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '9px',
                color: '#2ED573',
                background: '#2ED57312',
                border: '1px solid #2ED57330',
                padding: '4px 10px',
                borderRadius: '3px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                ● Disponibile
              </span>
            )}
            {config.location && (
              <span style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '9px',
                color: '#555',
                border: '1px solid #2A2A2A',
                padding: '4px 10px',
                borderRadius: '3px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                ◎ {config.location}
              </span>
            )}
          </div>
        )}

        {config.bio && (
          <p style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            color: '#F0EDE8',
            margin: 0,
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
          }}>
            {config.bio}
          </p>
        )}

        {config.bioLong && (
          <p style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '15px',
            color: '#888',
            margin: 0,
            lineHeight: 1.75,
          }}>
            {config.bioLong}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '8px', borderTop: '1px solid #1E1E1E' }}>
          {config.cvUrl && (
            <a href={config.cvUrl} target="_blank" rel="noopener noreferrer" style={linkStyle('#5A9B7A')}>
              ↓ Scarica CV
            </a>
          )}
          {config.githubUrl && (
            <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" style={linkStyle('#555')}>
              GitHub
            </a>
          )}
          {config.linkedinUrl && (
            <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer" style={linkStyle('#555')}>
              LinkedIn
            </a>
          )}
          {config.instagramUrl && (
            <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" style={linkStyle('#555')}>
              Instagram
            </a>
          )}
          {config.emailContact && (
            <a href={`mailto:${config.emailContact}`} style={linkStyle('#555')}>
              Email
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function linkStyle(color: string): React.CSSProperties {
  return {
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: '10px',
    color,
    border: '1px solid #2A2A2A',
    padding: '6px 14px',
    borderRadius: '3px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }
}

'use client'

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

interface MobileAboutProps {
  config: SiteConfig
  onBack: () => void
}

export function MobileAbout({ config, onBack }: MobileAboutProps) {
  return (
    <section style={{
      minHeight: '100dvh',
      scrollSnapAlign: 'start',
      background: '#111111',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 20px 16px',
        borderBottom: '1px solid #1E1E1E',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: '#111111',
        zIndex: 10,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 10,
            color: '#4B7A63',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            margin: '0 0 6px',
          }}>◈ Chi sono</p>
          <h2 style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: '#F0EDE8',
            margin: 0,
            lineHeight: 1,
          }}>
            {config.ownerName ?? 'Davide Dickmann'}
          </h2>
          {config.title && (
            <p style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 10,
              color: '#5A9B7A',
              margin: '6px 0 0',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>{config.title}</p>
          )}
        </div>
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
            flexShrink: 0,
          }}
        >← Torna</button>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 20px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {(config.availableForWork || config.location) && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {config.availableForWork && (
              <span style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 9,
                color: '#2ED573',
                background: '#2ED57312',
                border: '1px solid #2ED57330',
                padding: '4px 10px',
                borderRadius: 3,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>● Disponibile</span>
            )}
            {config.location && (
              <span style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: 9,
                color: '#555',
                border: '1px solid #2A2A2A',
                padding: '4px 10px',
                borderRadius: 3,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>◎ {config.location}</span>
            )}
          </div>
        )}

        {config.bio && (
          <p style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 17,
            color: '#F0EDE8',
            margin: 0,
            fontWeight: 600,
            lineHeight: 1.4,
          }}>{config.bio}</p>
        )}

        {config.bioLong && (
          <p style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: 14,
            color: '#888',
            margin: 0,
            lineHeight: 1.75,
          }}>{config.bioLong}</p>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid #1E1E1E' }}>
          {config.cvUrl && (
            <a href={config.cvUrl} target="_blank" rel="noopener noreferrer" style={link('#5A9B7A')}>↓ CV</a>
          )}
          {config.githubUrl && (
            <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" style={link('#555')}>GitHub</a>
          )}
          {config.linkedinUrl && (
            <a href={config.linkedinUrl} target="_blank" rel="noopener noreferrer" style={link('#555')}>LinkedIn</a>
          )}
          {config.instagramUrl && (
            <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" style={link('#555')}>Instagram</a>
          )}
          {config.emailContact && (
            <a href={`mailto:${config.emailContact}`} style={link('#555')}>Email</a>
          )}
        </div>
      </div>
    </section>
  )
}

function link(color: string): React.CSSProperties {
  return {
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: 10,
    color,
    border: '1px solid #2A2A2A',
    padding: '6px 14px',
    borderRadius: 3,
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }
}

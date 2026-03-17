'use client'

interface MobileHeroProps {
  ownerName?: string | null
  title?: string | null
}

const TAGS = ['React', 'Next.js', 'TypeScript', '3D/R3F']

export function MobileHero({ ownerName, title }: MobileHeroProps) {
  return (
    <section style={{
      height: '100dvh',
      scrollSnapAlign: 'start',
      background: '#0D0D0D',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '0 28px',
      position: 'relative',
    }}>
      <p style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 10,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: 16,
      }}>
        Portfolio · {new Date().getFullYear()}
      </p>

      <h1 style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: 'clamp(36px, 10vw, 60px)',
        fontWeight: 800,
        color: '#F0EDE8',
        lineHeight: 1.05,
        margin: '0 0 12px',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        width: '100%',
      }}>
        {ownerName ?? 'Portfolio'}
      </h1>

      <p style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 13,
        color: '#5A9B7A',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: 28,
      }}>
        {title ?? 'Developer'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {TAGS.map((tag) => (
          <span key={tag} style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 10,
            color: '#888',
            border: '1px solid #2A2A2A',
            borderRadius: 4,
            padding: '4px 10px',
            letterSpacing: '0.1em',
          }}>{tag}</span>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: 9,
          color: '#4B7A63',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}>Esplora lo spazio 3D</p>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{ animation: 'mobileBounce 1.2s ease-in-out infinite' }}
        >
          <path d="M10 4v12M4 10l6 6 6-6" stroke="#4B7A63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @keyframes mobileBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  )
}

'use client'

interface Passion {
  name: string
  emoji?: string
  color: string
}

interface PassionPanelProps {
  passion: Passion | null
  onClose: () => void
}

export function PassionPanel({ passion, onClose }: PassionPanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '320px',
        transform: passion ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(16px)',
        borderLeft: '1px solid rgba(124, 92, 252, 0.15)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 10,
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-end',
          background: 'none',
          border: 'none',
          color: '#555',
          fontSize: '20px',
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        ×
      </button>

      {passion && (
        <>
          {passion.emoji && <div style={{ fontSize: '40px', lineHeight: 1 }}>{passion.emoji}</div>}
          <h2 style={{
            color: passion.color,
            fontFamily: 'Outfit, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            margin: 0,
          }}>
            {passion.name}
          </h2>
          <p style={{ color: '#555', fontSize: '13px', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
            Progetti in arrivo — carica i contenuti dall&apos;admin panel.
          </p>
          <div style={{
            marginTop: '8px',
            padding: '16px',
            background: 'rgba(124, 92, 252, 0.06)',
            borderRadius: '8px',
            border: '1px solid rgba(124, 92, 252, 0.1)',
          }}>
            <p style={{ color: '#444', fontSize: '12px', fontFamily: 'Outfit, sans-serif', margin: 0, textAlign: 'center' }}>
              Nessun progetto ancora
            </p>
          </div>
        </>
      )}
    </div>
  )
}

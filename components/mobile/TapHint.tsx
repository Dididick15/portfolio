'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TapHintProps {
  visible: boolean
  onDismiss: () => void
}

export function TapHint({ visible, onDismiss }: TapHintProps) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, 2000)
    return () => clearTimeout(t)
  }, [visible, onDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 5, 16, 0.55)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5,
            gap: 12,
          }}
        >
          {/* Freccia SVG verde */}
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="#4B7A63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Testo con rimbalzo */}
          <motion.p
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: 11,
              color: '#4B7A63',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              margin: 0,
            }}
          >
            Tocca un oggetto
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

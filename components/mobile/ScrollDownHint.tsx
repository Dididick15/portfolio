'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ScrollDownHintProps {
  visible: boolean
}

export function ScrollDownHint({ visible }: ScrollDownHintProps) {
  return (
    <>
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: 9,
            color: '#4B7A63',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}>
            Scorri per i progetti
          </p>
          <svg
            width="18" height="18" viewBox="0 0 20 20" fill="none"
            style={{ animation: 'mobileBounce 1.2s ease-in-out infinite' }}
          >
            <path d="M10 4v12M4 10l6 6 6-6" stroke="#4B7A63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
    <style>{`
      @keyframes mobileBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(5px); }
      }
    `}</style>
    </>
  )
}

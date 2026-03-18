'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  progress: number    // 0–100
  isComplete: boolean
}

export default function LoadingScreen({ progress, isComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setVisible(false), 900)
      return () => clearTimeout(timer)
    }
  }, [isComplete])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0A0805',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9000,
        opacity: isComplete ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: isComplete ? 'none' : 'all',
        gap: '28px',
      }}
    >
      {/* Brand wordmark */}
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '6px',
          color: '#CFB53B',
          textTransform: 'uppercase',
        }}
      >
        Velta Craft
      </span>

      {/* Progress track */}
      <div
        style={{
          width: '200px',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #CFB53B, #E8D48A)',
            transition: 'width 0.15s ease',
          }}
        />
      </div>

      {/* Percentage counter */}
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '2px',
          color: '#C8B89A',
        }}
      >
        {progress}%
      </span>
    </div>
  )
}

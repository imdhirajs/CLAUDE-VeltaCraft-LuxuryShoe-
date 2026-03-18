'use client'

import { CSSProperties } from 'react'

interface TextOverlayProps {
  progress: number // 0–1
}

// Returns opacity 0–1 for a visibility window, with smooth fade edges
function getOpacity(progress: number, startPct: number, endPct: number): number {
  const start = startPct / 100
  const end = endPct / 100
  const fadeWindow = 0.04

  if (progress < start || progress > end) return 0
  if (progress < start + fadeWindow) return (progress - start) / fadeWindow
  if (progress > end - fadeWindow) return (end - progress) / fadeWindow
  return 1
}

const labelStyle: CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '4px',
  color: '#CFB53B',
  textTransform: 'uppercase',
  marginBottom: '20px',
  display: 'block',
}

const subtextStyle: CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '16px',
  fontWeight: 300,
  color: '#C8B89A',
  marginTop: '20px',
  lineHeight: 1.7,
}

export default function TextOverlay({ progress }: TextOverlayProps) {
  const s1 = getOpacity(progress, 0, 22)
  const s2 = getOpacity(progress, 30, 55)
  const s3 = getOpacity(progress, 60, 78)
  const s4 = getOpacity(progress, 84, 100)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {/* ── Section 1 — Chapter One — bottom-left ── */}
      <div
        style={{
          position: 'absolute',
          left: '10%',
          bottom: '15%',
          opacity: s1,
          transition: 'opacity 0.08s linear',
          pointerEvents: s1 > 0 ? 'auto' : 'none',
          maxWidth: '420px',
        }}
      >
        <span style={labelStyle}>Chapter One</span>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(52px, 5.5vw, 80px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 0.95,
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #FAF0E6 0%, #CFB53B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Built to Last<br />Forever.
        </h2>
        <p style={subtextStyle}>Every stitch placed by hand.</p>
      </div>

      {/* ── Section 2 — Chapter Two — top-right ── */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '20%',
          opacity: s2,
          transition: 'opacity 0.08s linear',
          textAlign: 'right',
          pointerEvents: s2 > 0 ? 'auto' : 'none',
          maxWidth: '380px',
        }}
      >
        <span style={{ ...labelStyle, textAlign: 'right', display: 'block' }}>Chapter Two</span>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(48px, 5vw, 72px)',
            fontWeight: 400,
            color: '#FAF0E6',
            lineHeight: 1.0,
            letterSpacing: '-0.5px',
          }}
        >
          Raw.<br />Refined.<br />Real.
        </h2>
        <p style={{ ...subtextStyle, textAlign: 'right' }}>
          See what goes into every pair.
        </p>
      </div>

      {/* ── Section 3 — Chapter Three — centered ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: s3,
          transition: 'opacity 0.08s linear',
          textAlign: 'center',
          pointerEvents: s3 > 0 ? 'auto' : 'none',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <span style={{ ...labelStyle, textAlign: 'center', display: 'block' }}>Chapter Three</span>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(56px, 6.5vw, 88px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 0.95,
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #CFB53B, #E8D48A, #FAF0E6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Crafted.<br />Not Made.
        </h2>
        <p style={{ ...subtextStyle, textAlign: 'center' }}>
          47 individual components. One vision.
        </p>
      </div>

      {/* ── Section 4 — CTA — centered ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: s4,
          transition: 'opacity 0.08s linear',
          textAlign: 'center',
          pointerEvents: s4 > 0 ? 'auto' : 'none',
          width: '100%',
          maxWidth: '700px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(60px, 7vw, 96px)',
            fontWeight: 300,
            color: '#FAF0E6',
            letterSpacing: '-2px',
            lineHeight: 1.0,
            marginBottom: '20px',
          }}
        >
          Own the Craft.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 300,
            color: '#C8B89A',
            marginBottom: '40px',
            lineHeight: 1.7,
          }}
        >
          Handcrafted in small batches. Ships worldwide.
        </p>
        <button
          data-cursor-hover="true"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '3px',
            background: 'linear-gradient(135deg, #CFB53B, #E8D48A)',
            color: '#0A0805',
            padding: '18px 48px',
            borderRadius: '0px',
            border: 'none',
            cursor: 'none',
            boxShadow: '0 0 40px rgba(207, 181, 59, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = '0 0 60px rgba(207, 181, 59, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 0 40px rgba(207, 181, 59, 0.3)'
          }}
        >
          SHOP THE DROP →
        </button>
      </div>
    </div>
  )
}

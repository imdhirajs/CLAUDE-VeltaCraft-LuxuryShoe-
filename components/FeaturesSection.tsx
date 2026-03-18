import { CSSProperties } from 'react'

const features = [
  {
    label: 'Technique',
    heading: 'Hand-Stitched\nPrecision',
    body: 'Every seam is placed by a single artisan. No machines. No shortcuts. Just 47 years of inherited craft.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#CFB53B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Needle and thread */}
        <path d="M8 24 L24 8" />
        <path d="M22 6 C24 4 28 4 28 8 C28 10 26 12 24 12 L20 16" />
        <circle cx="23" cy="7" r="1.5" fill="#CFB53B" stroke="none" />
        <path d="M4 28 C8 22 14 18 20 16" strokeDasharray="2 2" />
        <path d="M10 20 C12 18 14 16 16 14" />
      </svg>
    ),
  },
  {
    label: 'Material',
    heading: 'Full-Grain\nLeather',
    body: 'We source from a single family-owned tannery in León, Mexico. The hide improves with every wear.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#CFB53B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Hide / leaf shape */}
        <path d="M16 4 C22 4 28 10 28 16 C28 22 22 28 16 28 C10 28 4 22 4 16 C4 10 10 4 16 4 Z" />
        <path d="M16 4 L16 28" />
        <path d="M8 10 C12 12 16 12 20 10" />
        <path d="M7 16 C10 17 16 18 25 16" />
        <path d="M8 22 C12 21 16 20 22 22" />
      </svg>
    ),
  },
  {
    label: 'Construction',
    heading: 'Goodyear\nWelted Sole',
    body: 'When the sole wears out, we replace it. The upper lives on. A pair of Velta Crafts can outlast a decade.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#CFB53B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Shoe sole cross-section */}
        <path d="M4 22 C4 22 8 20 16 20 C24 20 28 22 28 22" />
        <path d="M4 22 L4 26 C4 27 5 28 6 28 L26 28 C27 28 28 27 28 26 L28 22" />
        <path d="M6 20 L6 14 C6 12 8 10 10 10 L22 10 C24 10 26 12 26 14 L26 20" />
        <path d="M4 22 L28 22" />
        <path d="M4 24 L28 24" />
      </svg>
    ),
  },
]

const sectionStyle: CSSProperties = {
  background: '#130E08',
  borderTop: '1px solid rgba(207,181,59,0.15)',
  padding: '120px 10%',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '80px',
}

export default function FeaturesSection() {
  return (
    <section style={sectionStyle}>
      <div className="features-grid" style={gridStyle}>
        {features.map((f) => (
          <div key={f.label}>
            {f.icon}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '3px',
                color: '#CFB53B',
                textTransform: 'uppercase',
                marginTop: '28px',
                marginBottom: '14px',
              }}
            >
              {f.label}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '28px',
                fontWeight: 500,
                color: '#FAF0E6',
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
                marginBottom: '18px',
              }}
            >
              {f.heading}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '15px',
                fontWeight: 300,
                color: '#C8B89A',
                lineHeight: 1.8,
              }}
            >
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

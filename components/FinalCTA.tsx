'use client'

export default function FinalCTA() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #130E08 0%, #0A0805 100%)',
        padding: '160px 10%',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(56px, 7vw, 96px)',
          fontWeight: 300,
          color: '#FAF0E6',
          letterSpacing: '-2px',
          lineHeight: 1.0,
          marginBottom: '24px',
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
          marginBottom: '48px',
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
    </section>
  )
}

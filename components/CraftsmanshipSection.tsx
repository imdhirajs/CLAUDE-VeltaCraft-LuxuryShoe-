export default function CraftsmanshipSection() {
  return (
    <section
      style={{
        background: '#0A0805',
        padding: '160px 10%',
        textAlign: 'center',
      }}
    >
      {/* Gold divider — top */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: '#CFB53B',
          margin: '0 auto 64px',
        }}
      />

      <blockquote
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#FAF0E6',
          lineHeight: 1.35,
          maxWidth: '800px',
          margin: '0 auto',
          letterSpacing: '-0.5px',
        }}
      >
        &ldquo;Every pair takes 14 hours to make.&rdquo;
      </blockquote>

      {/* Gold divider — bottom */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: '#CFB53B',
          margin: '64px auto 0',
        }}
      />
    </section>
  )
}

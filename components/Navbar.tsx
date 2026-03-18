'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = ['Craft', 'Collection', 'Story']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: '0 48px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10, 8, 5, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Brand wordmark */}
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '4px',
          color: '#FAF0E6',
          textTransform: 'uppercase',
        }}
      >
        Velta Craft
      </span>

      {/* Navigation links + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '2px',
              color: '#C8B89A',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CFB53B')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#C8B89A')}
          >
            {link}
          </a>
        ))}

        {/* SHOP NOW pill */}
        <button
          data-cursor-hover="true"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '2px',
            color: '#CFB53B',
            background: 'transparent',
            border: '1px solid #CFB53B',
            padding: '8px 20px',
            borderRadius: '2px',
            cursor: 'none',
            transition: 'background 0.3s ease, color 0.3s ease',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#CFB53B'
            e.currentTarget.style.color = '#0A0805'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#CFB53B'
          }}
        >
          Shop Now
        </button>
      </div>
    </nav>
  )
}

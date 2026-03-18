'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0

      if (barRef.current) {
        barRef.current.style.width = `${pct}%`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{ width: '0%' }}
      aria-hidden="true"
    />
  )
}

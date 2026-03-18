'use client'

import { useEffect, useState, useCallback, RefObject } from 'react'

export function useScrollProgress(containerRef: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollableHeight = el.offsetHeight - window.innerHeight
    // Negative top = how many px we've scrolled into the container
    const scrolledIn = -rect.top
    const raw = scrolledIn / scrollableHeight
    const clamped = Math.max(0, Math.min(1, raw))

    setProgress(clamped)
    setScrollY(window.scrollY)
  }, [containerRef])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initialize from current scroll position on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { progress, scrollY }
}

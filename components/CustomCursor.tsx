'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const outerPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Inner cursor moves instantly
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`
        innerRef.current.style.top = `${e.clientY}px`
      }

      // Check if hovering an interactive element
      const target = e.target as HTMLElement
      const isHovering = target.closest('[data-cursor-hover="true"]') !== null

      innerRef.current?.classList.toggle('hover', isHovering)
      outerRef.current?.classList.toggle('hover', isHovering)
    }

    // Outer ring lerp loop — creates the lag effect
    const animateOuter = () => {
      const lerp = 0.12
      outerPosRef.current.x += (mouseRef.current.x - outerPosRef.current.x) * lerp
      outerPosRef.current.y += (mouseRef.current.y - outerPosRef.current.y) * lerp

      if (outerRef.current) {
        outerRef.current.style.left = `${outerPosRef.current.x}px`
        outerRef.current.style.top = `${outerPosRef.current.y}px`
      }

      rafRef.current = requestAnimationFrame(animateOuter)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animateOuter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={innerRef} className="cursor-inner" aria-hidden="true" />
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
    </>
  )
}

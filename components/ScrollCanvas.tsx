'use client'

import { useEffect, useRef, useCallback, RefObject } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// Total frames extracted from Shoe 1.mp4 at ~24fps (~192 frames)
const TOTAL_FRAMES = 192

interface ScrollCanvasProps {
  containerRef: RefObject<HTMLDivElement>
  onLoadProgress: (pct: number) => void
  onLoadComplete: () => void
}

export default function ScrollCanvas({
  containerRef,
  onLoadProgress,
  onLoadComplete,
}: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>([])
  const currentFrameRef = useRef(1)
  const rafRef = useRef<number>(0)
  const loadedRef = useRef(false)
  const { progress } = useScrollProgress(containerRef)

  // --- Frame Preloading ---
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const frameStep = isMobile ? 2 : 1

    const framesToLoad: number[] = []
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      framesToLoad.push(i)
    }

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null)
    let loaded = 0
    const total = framesToLoad.length

    framesToLoad.forEach((frameNum) => {
      const img = new Image()
      const paddedNum = String(frameNum).padStart(4, '0')
      img.src = `/frames/frame_${paddedNum}.webp`

      const onDone = () => {
        images[frameNum] = img
        loaded++
        const pct = Math.round((loaded / total) * 100)
        onLoadProgress(pct)
        if (loaded === total) {
          framesRef.current = images
          loadedRef.current = true
          onLoadComplete()
          // Draw the first frame immediately
          drawFrame(1)
        }
      }

      img.onload = onDone
      img.onerror = onDone // don't block forever on missing frames
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // --- Draw a frame to canvas ---
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[frameIndex]
    if (!img) return

    const logicalW = canvas.offsetWidth
    const logicalH = canvas.offsetHeight

    // Object-fit: contain — center image preserving aspect ratio
    const scaleX = logicalW / img.naturalWidth
    const scaleY = logicalH / img.naturalHeight
    const scale = Math.min(scaleX, scaleY)
    const drawW = img.naturalWidth * scale
    const drawH = img.naturalHeight * scale
    const offsetX = (logicalW - drawW) / 2
    const offsetY = (logicalH - drawH) / 2

    ctx.fillStyle = '#0A0805'
    ctx.fillRect(0, 0, logicalW, logicalH)
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  }, [])

  // --- RAF-driven render on scroll ---
  useEffect(() => {
    if (!loadedRef.current) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const frameStep = isMobile ? 2 : 1
    const effectiveFrames = Math.ceil(TOTAL_FRAMES / frameStep)

    const rawFrame = Math.round(progress * (effectiveFrames - 1))
    const actualFrame = Math.max(1, Math.min(TOTAL_FRAMES, rawFrame * frameStep + 1))

    if (actualFrame !== currentFrameRef.current) {
      currentFrameRef.current = actualFrame
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => drawFrame(actualFrame))
    }
  }, [progress, drawFrame])

  // --- Canvas sizing (DPR-aware) ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      // Set CSS size
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'
      // Set pixel buffer size
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
      // Redraw current frame after resize
      drawFrame(currentFrameRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'sticky',
        top: 0,
        display: 'block',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0A0805',
      }}
    />
  )
}

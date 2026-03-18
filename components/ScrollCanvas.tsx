'use client'

import { useEffect, useRef, useCallback, RefObject, useState } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

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
  // useState so the RAF draw effect re-triggers when loading completes
  const [isLoaded, setIsLoaded] = useState(false)
  const { progress } = useScrollProgress(containerRef)

  // --- Draw a frame to canvas ---
  // Uses window.innerWidth/Height — always reliable on client,
  // avoids canvas.offsetWidth timing issues with DPR scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[frameIndex]
    if (!img || !img.naturalWidth) return

    const dpr = window.devicePixelRatio || 1
    const logicalW = window.innerWidth
    const logicalH = window.innerHeight

    // Object-fit: contain — center image preserving aspect ratio
    const scale = Math.min(logicalW / img.naturalWidth, logicalH / img.naturalHeight)
    const drawW = img.naturalWidth * scale
    const drawH = img.naturalHeight * scale
    const offsetX = (logicalW - drawW) / 2
    const offsetY = (logicalH - drawH) / 2

    // Reset transform before drawing to avoid scale accumulation
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = '#0A0805'
    ctx.fillRect(0, 0, logicalW, logicalH)
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  }, [])

  // --- Canvas sizing (DPR-aware) ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      drawFrame(currentFrameRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

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
          onLoadComplete()
          // setIsLoaded triggers the RAF draw effect to run
          setIsLoaded(true)
        }
      }

      img.onload = onDone
      img.onerror = onDone
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // --- RAF-driven render on scroll ---
  // This effect runs whenever progress changes OR isLoaded becomes true
  useEffect(() => {
    if (!isLoaded) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const frameStep = isMobile ? 2 : 1
    const effectiveFrames = Math.ceil(TOTAL_FRAMES / frameStep)

    const rawFrame = Math.round(progress * (effectiveFrames - 1))
    const actualFrame = Math.max(1, Math.min(TOTAL_FRAMES, rawFrame * frameStep + 1))

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      currentFrameRef.current = actualFrame
      drawFrame(actualFrame)
    })
  }, [progress, isLoaded, drawFrame])

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

'use client'

import { useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollCanvas from '@/components/ScrollCanvas'
import TextOverlay from '@/components/TextOverlay'
import FeaturesSection from '@/components/FeaturesSection'
import CraftsmanshipSection from '@/components/CraftsmanshipSection'
import FinalCTA from '@/components/FinalCTA'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// Inner component that shares the containerRef between ScrollCanvas and TextOverlay
function ScrollCanvasSection({
  onLoadProgress,
  onLoadComplete,
}: {
  onLoadProgress: (pct: number) => void
  onLoadComplete: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { progress } = useScrollProgress(containerRef)

  return (
    // 500vh scroll container — sticky canvas lives inside
    <div
      ref={containerRef}
      style={{ height: '500vh', position: 'relative' }}
    >
      <ScrollCanvas
        containerRef={containerRef}
        onLoadProgress={onLoadProgress}
        onLoadComplete={onLoadComplete}
      />
      <TextOverlay progress={progress} />
    </div>
  )
}

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      <main>
        <Navbar />

        <ScrollCanvasSection
          onLoadProgress={setLoadProgress}
          onLoadComplete={() => setIsLoaded(true)}
        />

        <FeaturesSection />
        <CraftsmanshipSection />
        <FinalCTA />
      </main>
    </>
  )
}

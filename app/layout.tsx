import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Velta Craft — Handcrafted Luxury Footwear',
  description: 'Where leather becomes legend. Handcrafted shoes built to last forever.',
  openGraph: {
    title: 'Velta Craft — Handcrafted Luxury Footwear',
    description: 'Where leather becomes legend. Handcrafted shoes built to last forever.',
    images: ['/frames/frame_0001.webp'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0805',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  )
}

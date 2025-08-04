
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Garment Image Processor',
  description: 'Professional print-on-demand image processing for Spreadshirt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">{children}</body>
    </html>
  )
}

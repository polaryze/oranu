import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oranu',
  description: 'Study, your way',
  generator: 'oranu.ai',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}

/* Safari viewport fixes */
@supports (-webkit-touch-callout: none) {
  html, body {
    height: -webkit-fill-available;
  }
}

/* Ensure full coverage */
html, body {
  margin: 0;
  padding: 0;
  background-color: #0A0A0A;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}

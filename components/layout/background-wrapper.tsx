"use client"

import type React from "react"

interface BackgroundWrapperProps {
  children: React.ReactNode
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="h-screen md:h-screen min-h-screen relative overflow-auto md:overflow-hidden">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/wallpaper.webp)',
          backgroundColor: '#1a1a1a', // Fallback color
        }}
      ></div>
      
      {/* Dark Tint Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Mobile feathering effect at top - smooth transition to black */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-0 pointer-events-none md:hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0) 100%)'
        }}
      ></div>
      
      {/* Additional Blur Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-cyan-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-10 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full md:h-full min-h-full">
        {children}
      </div>
    </div>
  )
}

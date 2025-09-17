"use client"

import type React from "react"
import dynamic from "next/dynamic"
import { Sidebar } from "@/components/layout/sidebar"

const AuthGuard = dynamic(() => import("@/components/auth/auth-guard").then(mod => ({ default: mod.AuthGuard })), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="h-screen relative overflow-hidden">
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
        
        {/* Additional Blur Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-cyan-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-10 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex h-full">
          <Sidebar />
          <main className="flex-1 ml-0 md:ml-72 overflow-hidden">
            <div className="h-full p-4 lg:p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

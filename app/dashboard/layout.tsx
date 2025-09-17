"use client"

import type React from "react"
import dynamic from "next/dynamic"
import { Sidebar } from "@/components/layout/sidebar"
import { BackgroundWrapper } from "@/components/layout/background-wrapper"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"

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
      <BackgroundWrapper>
        <div className="flex h-full md:h-full min-h-full">
          {/* Desktop Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-72">
            <div className="h-full md:h-full min-h-full p-4 lg:p-6 relative">
              {/* Mobile fade effect at top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none md:hidden"></div>
              {children}
            </div>
          </main>
          
          {/* Mobile Sidebar */}
          <MobileSidebar />
        </div>
      </BackgroundWrapper>
    </AuthGuard>
  )
}

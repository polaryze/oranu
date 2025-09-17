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
            <div className="h-full md:h-full min-h-full pt-32 md:pt-4 pb-4 px-4 lg:px-6 relative">
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

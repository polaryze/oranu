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
        <div className="flex h-full">
          {/* Desktop Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-72 overflow-auto md:overflow-hidden">
            <div className="h-full p-4 lg:p-6">{children}</div>
          </main>
          
          {/* Mobile Sidebar */}
          <MobileSidebar />
        </div>
      </BackgroundWrapper>
    </AuthGuard>
  )
}

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
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Simplified background for testing */}
        <div className="absolute inset-0 bg-black/20"></div>

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

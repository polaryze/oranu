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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto ml-0 md:ml-72">
            <div className="p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

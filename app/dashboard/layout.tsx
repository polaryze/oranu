import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 md:ml-64 overflow-auto">
          <div className="p-6 pt-16 md:pt-6">{children}</div>
        </main>
      </div>
    </AuthGuard>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const AuthGuard = dynamic(() => import("@/components/auth/auth-guard").then(mod => ({ default: mod.AuthGuard })), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function FriendsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Top Navigation */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold">Friends</h1>
              <p className="text-muted-foreground">Add and view friends. Streaks and social features coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}



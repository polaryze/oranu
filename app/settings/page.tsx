"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const AuthGuard = dynamic(() => import("@/components/auth/auth-guard").then(mod => ({ default: mod.AuthGuard })), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function SettingsPage() {
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
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
            {/* Oranu Logo - Left */}
            <Link href="/">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">O</span>
              </div>
            </Link>
            
            {/* Dashboard Icon - Right */}
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <LayoutDashboard className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Account and preferences coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}



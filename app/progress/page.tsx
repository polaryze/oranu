"use client"

import { StatsOverview } from "@/components/progress/stats-overview"
import { StudyTimeChart } from "@/components/progress/study-time-chart"
import { SubjectBreakdown } from "@/components/progress/subject-breakdown"
import { StreakCalendar } from "@/components/progress/streak-calendar"
import { AchievementBadges } from "@/components/progress/achievement-badges"
import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { BackgroundWrapper } from "@/components/layout/background-wrapper"

const AuthGuard = dynamic(() => import("@/components/auth/auth-guard").then(mod => ({ default: mod.AuthGuard })), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function ProgressPage() {
  return (
    <AuthGuard>
      <BackgroundWrapper>
        <div className="flex h-full flex-col">
          {/* Top Navigation */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
            {/* Oranu Logo - Left */}
            <Link href="/">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center sm:hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">O</span>
              </div>
            </Link>
            
            {/* Dashboard Icon - Right */}
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white/80 sm:hover:text-white p-2">
                <LayoutDashboard className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Progress Tracking</h1>
                <p className="text-white/80">Monitor your study progress and achievements</p>
              </div>

              <StatsOverview />

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <StudyTimeChart />
                <SubjectBreakdown />
              </div>

              <StreakCalendar />

              <AchievementBadges />
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    </AuthGuard>
  )
}

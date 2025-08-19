import { StatsOverview } from "@/components/progress/stats-overview"
import { StudyTimeChart } from "@/components/progress/study-time-chart"
import { SubjectBreakdown } from "@/components/progress/subject-breakdown"
import { StreakCalendar } from "@/components/progress/streak-calendar"
import { AchievementBadges } from "@/components/progress/achievement-badges"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function ProgressPage() {
  return (
    <AuthGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your study progress and achievements</p>
        </div>

        <StatsOverview />

        <div className="grid gap-6 lg:grid-cols-2">
          <StudyTimeChart />
          <SubjectBreakdown />
        </div>

        <StreakCalendar />

        <AchievementBadges />
      </div>
    </AuthGuard>
  )
}

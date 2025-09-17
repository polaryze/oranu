import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 left-20 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col p-4 lg:p-6">
        {/* Overview Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <OverviewCards />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 flex-1 min-h-0">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}

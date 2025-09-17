import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="h-full max-w-7xl mx-auto flex flex-col">
      {/* Overview Cards */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <OverviewCards />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 flex-1 min-h-0">
        <RecentActivity />
      </div>
    </div>
  )
}

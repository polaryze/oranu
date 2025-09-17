import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col space-y-4 md:space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
        <RecentActivity />
      </div>
    </div>
  )
}

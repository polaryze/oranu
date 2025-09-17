import { Button } from "@/components/ui/button"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Play, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Ready to continue your study journey? Let's make today productive.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto">
            <Play className="mr-2 h-4 w-4" />
            Quick Study
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}

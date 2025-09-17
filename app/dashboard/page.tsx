import { Button } from "@/components/ui/button"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Play, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ready to continue your study journey? Let's make today productive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Play className="mr-2 h-5 w-5" />
            Quick Study
          </Button>
          <Button variant="outline" size="lg" className="border-border/50 hover:bg-muted/50">
            <Plus className="mr-2 h-5 w-5" />
            Schedule Session
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <RecentActivity />
      </div>
    </div>
  )
}

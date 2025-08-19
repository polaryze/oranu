import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Target, BookOpen, Flame, Users } from "lucide-react"

const stats = [
  {
    title: "Total Study Time",
    value: "127h 45m",
    change: "+12% from last month",
    icon: Clock,
    trend: "up",
  },
  {
    title: "Sessions Completed",
    value: "89",
    change: "+8 this week",
    icon: Target,
    trend: "up",
  },
  {
    title: "Current Streak",
    value: "7 days",
    change: "3 days to beat your record",
    icon: Flame,
    trend: "neutral",
  },
  {
    title: "Subjects Studied",
    value: "5",
    change: "Mathematics is your top subject",
    icon: BookOpen,
    trend: "neutral",
  },
  {
    title: "Study Friends",
    value: "12",
    change: "+2 new friends this month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Average Session",
    value: "45 min",
    change: "+5 min from last month",
    icon: TrendingUp,
    trend: "up",
  },
]

export function StatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

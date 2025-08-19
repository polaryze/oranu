import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Users } from "lucide-react"

const recentSessions = [
  {
    id: 1,
    subject: "Physics",
    technique: "Pomodoro",
    duration: "50 minutes",
    time: "2 hours ago",
    completed: true,
  },
  {
    id: 2,
    subject: "Chemistry",
    technique: "Feynman",
    duration: "30 minutes",
    time: "4 hours ago",
    completed: true,
  },
  {
    id: 3,
    subject: "Mathematics",
    technique: "Active Recall",
    duration: "45 minutes",
    time: "Yesterday",
    completed: false,
  },
]

const friendActivity = [
  { name: "Alex", action: "completed 3 Pomodoro sessions", time: "1 hour ago" },
  { name: "Sarah", action: "reached a 10-day streak", time: "3 hours ago" },
  { name: "Mike", action: "studied for 4 hours today", time: "5 hours ago" },
]

export function RecentActivity() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Study Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{session.subject}</span>
                  <Badge variant="secondary" className="text-xs">
                    {session.technique}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {session.duration} • {session.time}
                </div>
              </div>
              <Badge variant={session.completed ? "default" : "outline"}>
                {session.completed ? "Completed" : "Incomplete"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Friend Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Friend Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {friendActivity.map((activity, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">{activity.name[0]}</span>
                </div>
                <span className="font-medium">{activity.name}</span>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                {activity.action} • {activity.time}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

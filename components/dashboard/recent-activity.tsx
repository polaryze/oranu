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
    <>
      {/* Recent Study Sessions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 bg-primary/10 rounded-md flex items-center justify-center">
              <BookOpen className="h-3 w-3 text-primary" />
            </div>
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          {recentSessions.map((session) => (
            <div key={session.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <span className="font-medium text-foreground text-sm">{session.subject}</span>
                  <Badge variant="secondary" className="text-xs w-fit bg-primary/10 text-primary border-primary/20">
                    {session.technique}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {session.duration} • {session.time}
                </div>
              </div>
              <Badge variant={session.completed ? "default" : "outline"} className="w-fit text-xs">
                {session.completed ? "Completed" : "Incomplete"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Friend Activity */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 bg-accent/10 rounded-md flex items-center justify-center">
              <Users className="h-3 w-3 text-accent" />
            </div>
            Friend Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          {friendActivity.map((activity, index) => (
            <div key={index} className="space-y-1 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{activity.name[0]}</span>
                </div>
                <span className="font-medium text-foreground text-sm">{activity.name}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-8">
                {activity.action} • {activity.time}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

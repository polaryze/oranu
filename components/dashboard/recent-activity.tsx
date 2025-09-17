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
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-white">
            <div className="w-4 h-4 bg-blue-500/20 rounded-md flex items-center justify-center">
              <BookOpen className="h-2.5 w-2.5 text-blue-400" />
            </div>
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          {recentSessions.map((session) => (
            <div key={session.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <span className="font-medium text-white text-sm">{session.subject}</span>
                  <Badge variant="secondary" className="text-xs w-fit bg-blue-500/20 text-blue-300 border-blue-400/30">
                    {session.technique}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Clock className="h-3 w-3" />
                  {session.duration} • {session.time}
                </div>
              </div>
              <Badge variant={session.completed ? "default" : "outline"} className="w-fit text-xs bg-green-500/20 text-green-300 border-green-400/30">
                {session.completed ? "Completed" : "Incomplete"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Friend Activity */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-white">
            <div className="w-4 h-4 bg-purple-500/20 rounded-md flex items-center justify-center">
              <Users className="h-2.5 w-2.5 text-purple-400" />
            </div>
            Friend Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          {friendActivity.map((activity, index) => (
            <div key={index} className="space-y-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{activity.name[0]}</span>
                </div>
                <span className="font-medium text-white text-sm">{activity.name}</span>
              </div>
              <p className="text-xs text-white/60 ml-8">
                {activity.action} • {activity.time}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

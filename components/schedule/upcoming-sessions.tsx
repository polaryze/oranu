import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Play, Edit, Trash2 } from "lucide-react"

const upcomingSessions = [
  {
    id: 1,
    subject: "Mathematics",
    technique: "Pomodoro",
    date: "Today",
    time: "2:00 PM",
    duration: 60,
    notes: "Focus on calculus derivatives",
  },
  {
    id: 2,
    subject: "Physics",
    technique: "Feynman",
    date: "Today",
    time: "4:30 PM",
    duration: 45,
    notes: "Explain quantum mechanics concepts",
  },
  {
    id: 3,
    subject: "Chemistry",
    technique: "Active Recall",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: 90,
    notes: "Organic chemistry reactions",
  },
]

export function UpcomingSessions() {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-border/50">
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Upcoming
        </h3>
      </div>
      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-2 sm:space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="group p-2 sm:p-3 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3 text-primary" />
                    <span className="font-medium text-xs sm:text-sm">{session.subject}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{session.technique}</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
                  <span>{session.date} at {session.time}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{session.duration}m</span>
                </div>
                {session.notes && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{session.notes}</p>
                )}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button size="sm" variant="default" className="h-6 px-2 text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 px-2">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 px-2">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingSessions.map((session) => (
          <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="font-medium">{session.subject}</span>
                <Badge variant="secondary">{session.technique}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {session.date} at {session.time}
                </span>
                <span>{session.duration} minutes</span>
              </div>
              {session.notes && <p className="text-sm text-muted-foreground">{session.notes}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="default">
                <Play className="h-3 w-3 mr-1" />
                Start
              </Button>
              <Button size="sm" variant="ghost">
                <Edit className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

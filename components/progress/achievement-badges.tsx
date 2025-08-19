import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Flame, Clock, Brain, Users } from "lucide-react"

const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first study session",
    icon: Target,
    earned: true,
    earnedDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "Study for 7 consecutive days",
    icon: Flame,
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Time Master",
    description: "Complete 10 Pomodoro sessions",
    icon: Clock,
    earned: true,
    earnedDate: "2024-01-12",
  },
  {
    id: 4,
    name: "Knowledge Seeker",
    description: "Use 3 different study techniques",
    icon: Brain,
    earned: false,
    progress: "2/3",
  },
  {
    id: 5,
    name: "Social Learner",
    description: "Add 5 study friends",
    icon: Users,
    earned: false,
    progress: "1/5",
  },
  {
    id: 6,
    name: "Champion",
    description: "Maintain a 30-day study streak",
    icon: Trophy,
    earned: false,
    progress: "7/30",
  },
]

export function AchievementBadges() {
  const earnedCount = achievements.filter((a) => a.earned).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </div>
          <Badge variant="outline">
            {earnedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-muted"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="secondary" className="mt-2">
                        Earned {achievement.earnedDate}
                      </Badge>
                    ) : (
                      achievement.progress && (
                        <Badge variant="outline" className="mt-2">
                          {achievement.progress}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

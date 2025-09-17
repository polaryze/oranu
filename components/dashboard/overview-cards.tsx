import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Clock, Target, Calendar } from "lucide-react"

export function OverviewCards() {
  return (
    <>
      {/* Current Streak */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Flame className="h-4 w-4 text-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">7 days</div>
          <p className="text-sm text-muted-foreground mt-1">Keep it up! 3 more for your best streak</p>
        </CardContent>
      </Card>

      {/* Today's Study Time */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Today's Study Time</CardTitle>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">2h 30m</div>
          <p className="text-sm text-muted-foreground mt-1">30m left to reach daily goal</p>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Progress</CardTitle>
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Target className="h-4 w-4 text-secondary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">85%</div>
          <p className="text-sm text-muted-foreground mt-1">17h of 20h weekly goal completed</p>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Next Session</CardTitle>
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Calendar className="h-4 w-4 text-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">2:00 PM</div>
          <p className="text-sm text-muted-foreground mt-1">Mathematics - Calculus Review</p>
        </CardContent>
      </Card>
    </>
  )
}

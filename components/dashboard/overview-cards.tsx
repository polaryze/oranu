import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Clock, Target, Calendar } from "lucide-react"

export function OverviewCards() {
  return (
    <>
      {/* Current Streak */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xs font-medium text-white/80">Current Streak</CardTitle>
          <div className="w-4 h-4 bg-orange-500/20 rounded-md flex items-center justify-center">
            <Flame className="h-2.5 w-2.5 text-orange-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-lg md:text-xl font-bold text-white">7 days</div>
          <p className="text-xs text-white/60 mt-1 hidden sm:block">Keep it up! 3 more for your best streak</p>
        </CardContent>
      </Card>

      {/* Today's Study Time */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xs font-medium text-white/80">Today's Study Time</CardTitle>
          <div className="w-4 h-4 bg-blue-500/20 rounded-md flex items-center justify-center">
            <Clock className="h-2.5 w-2.5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-lg md:text-xl font-bold text-white">2h 30m</div>
          <p className="text-xs text-white/60 mt-1 hidden sm:block">30m left to reach daily goal</p>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xs font-medium text-white/80">Weekly Progress</CardTitle>
          <div className="w-4 h-4 bg-green-500/20 rounded-md flex items-center justify-center">
            <Target className="h-2.5 w-2.5 text-green-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-lg md:text-xl font-bold text-white">85%</div>
          <p className="text-xs text-white/60 mt-1 hidden sm:block">17h of 20h weekly goal completed</p>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xs font-medium text-white/80">Next Session</CardTitle>
          <div className="w-4 h-4 bg-purple-500/20 rounded-md flex items-center justify-center">
            <Calendar className="h-2.5 w-2.5 text-purple-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-lg md:text-xl font-bold text-white">2:00 PM</div>
          <p className="text-xs text-white/60 mt-1 hidden sm:block">Mathematics - Calculus Review</p>
        </CardContent>
      </Card>
    </>
  )
}

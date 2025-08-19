"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

// Generate mock streak data for the last 3 months
const generateStreakData = () => {
  const data = []
  const today = new Date()

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Simulate study activity (70% chance of studying)
    const hasStudied = Math.random() > 0.3
    const intensity = hasStudied ? Math.floor(Math.random() * 4) + 1 : 0

    data.push({
      date: date.toISOString().split("T")[0],
      intensity,
      hasStudied,
    })
  }

  return data
}

const streakData = generateStreakData()

export function StreakCalendar() {
  const currentStreak = 7
  const longestStreak = 23

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-muted"
      case 1:
        return "bg-green-200"
      case 2:
        return "bg-green-300"
      case 3:
        return "bg-green-400"
      case 4:
        return "bg-green-500"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Study Streak
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Current: {currentStreak} days</Badge>
            <Badge variant="outline">Best: {longestStreak} days</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-13 gap-1">
            {streakData.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${getIntensityColor(day.intensity)}`}
                title={`${day.date}: ${day.hasStudied ? `${day.intensity}h studied` : "No study"}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <div className="w-3 h-3 rounded-sm bg-green-200" />
              <div className="w-3 h-3 rounded-sm bg-green-300" />
              <div className="w-3 h-3 rounded-sm bg-green-400" />
              <div className="w-3 h-3 rounded-sm bg-green-500" />
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

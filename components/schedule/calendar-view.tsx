"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Mock scheduled sessions
const scheduledSessions = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00",
    subject: "Mathematics",
    technique: "Pomodoro",
    duration: 60,
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "14:00",
    subject: "Physics",
    technique: "Feynman",
    duration: 45,
  },
  {
    id: 3,
    date: "2024-01-16",
    time: "10:00",
    subject: "Chemistry",
    technique: "Active Recall",
    duration: 90,
  },
]

export function CalendarView({ onCreateSession }: { onCreateSession: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week">("month")

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentYear, currentMonth + (direction === "next" ? 1 : -1), 1))
  }

  const getSessionsForDate = (date: string) => {
    return scheduledSessions.filter((session) => session.date === date)
  }

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border/50" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(day)
      const sessions = getSessionsForDate(dateString)
      const isToday =
        today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear

      days.push(
        <div
          key={day}
          className={`h-24 border border-border/50 p-1 ${isToday ? "bg-primary/10" : "hover:bg-muted/50"}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>{day}</div>
          <div className="space-y-1">
            {sessions.slice(0, 2).map((session) => (
              <div key={session.id} className="text-xs p-1 rounded bg-primary/20 text-primary truncate">
                {session.time} {session.subject}
              </div>
            ))}
            {sessions.length > 2 && <div className="text-xs text-muted-foreground">+{sessions.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              {months[currentMonth]} {currentYear}
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border">
              <Button variant={view === "month" ? "default" : "ghost"} size="sm" onClick={() => setView("month")}>
                Month
              </Button>
              <Button variant={view === "week" ? "default" : "ghost"} size="sm" onClick={() => setView("week")}>
                Week
              </Button>
            </div>
            <Button onClick={onCreateSession}>
              <Plus className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "month" ? (
          <div className="space-y-4">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-0">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center font-medium text-sm border border-border/50 bg-muted/50"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Week view coming soon...</div>
        )}
      </CardContent>
    </Card>
  )
}

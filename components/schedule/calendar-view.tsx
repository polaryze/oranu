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
      days.push(<div key={`empty-${i}`} className="h-16 rounded-lg" />)
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
          className={`h-16 rounded-lg p-2 flex flex-col ${isToday ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/30 border border-transparent hover:border-border/50"}`}
        >
          <div className={`text-xs font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</div>
          <div className="flex-1 flex flex-col justify-end space-y-0.5">
            {sessions.slice(0, 1).map((session) => (
              <div key={session.id} className="text-xs p-1 rounded bg-primary/20 text-primary truncate">
                {session.time} {session.subject}
              </div>
            ))}
            {sessions.length > 1 && (
              <div className="text-xs text-muted-foreground text-center">+{sessions.length - 1}</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="hover:bg-primary/10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold text-foreground">
              {months[currentMonth]} {currentYear}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="hover:bg-primary/10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex rounded-lg border border-border/50 overflow-hidden">
            <Button 
              variant={view === "month" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setView("month")}
              className="text-xs rounded-none first:rounded-l-lg last:rounded-r-lg"
            >
              Month
            </Button>
            <Button 
              variant={view === "week" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setView("week")}
              className="text-xs rounded-none first:rounded-l-lg last:rounded-r-lg"
            >
              Week
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 p-4 overflow-auto">
        {view === "month" ? (
          <div className="h-full flex flex-col">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center font-medium text-xs text-muted-foreground bg-muted/30 rounded-lg"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="flex-1 grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Week view coming soon...
          </div>
        )}
      </div>
    </div>
  )
}

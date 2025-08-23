"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { CalendarView } from "@/components/schedule/calendar-view"
import { UpcomingSessions } from "@/components/schedule/upcoming-sessions"
import { SessionForm } from "@/components/schedule/session-form"

const AuthGuard = dynamic(() => import("@/components/auth/auth-guard").then(mod => ({ default: mod.AuthGuard })), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function SchedulePage() {
  const [showSessionForm, setShowSessionForm] = useState(false)

  const handleCreateSession = () => {
    setShowSessionForm(true)
  }

  const handleSaveSession = (sessionData: any) => {
    console.log("[v0] New session created:", sessionData)
    // Here you would typically save to your database
    setShowSessionForm(false)
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Plan and manage your study sessions</p>
        </div>

        {showSessionForm ? (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <SessionForm onClose={() => setShowSessionForm(false)} onSave={handleSaveSession} />
          </div>
        ) : (
          <div className="space-y-6">
            <CalendarView onCreateSession={handleCreateSession} />
            <UpcomingSessions />
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

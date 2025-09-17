"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { CalendarView } from "@/components/schedule/calendar-view"
import { UpcomingSessions } from "@/components/schedule/upcoming-sessions"
import { SessionForm } from "@/components/schedule/session-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Plus } from "lucide-react"
import Link from "next/link"

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
      <div className="h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex h-full">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <Link href="/files">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Files
                  </Button>
                </Link>
                <div className="h-6 w-px bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Study Schedule
                  </h1>
                </div>
              </div>
              
              <Button 
                onClick={handleCreateSession}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>

            {/* Main Content - Side by Side Layout */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar - Takes 2/3 of the space */}
                <div className="lg:col-span-2">
                  <CalendarView onCreateSession={handleCreateSession} />
                </div>
                
                {/* Upcoming Sessions - Takes 1/3 of the space */}
                <div className="lg:col-span-1">
                  <UpcomingSessions />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Form Modal */}
        {showSessionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <SessionForm onClose={() => setShowSessionForm(false)} onSave={handleSaveSession} />
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { CalendarView } from "@/components/schedule/calendar-view"
import { UpcomingSessions } from "@/components/schedule/upcoming-sessions"
import { SessionForm } from "@/components/schedule/session-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Plus, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { BackgroundWrapper } from "@/components/layout/background-wrapper"

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
      <BackgroundWrapper>
        <div className="flex h-full">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
              {/* Oranu Logo - Left */}
              <Link href="/">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center sm:hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
              </Link>
              
              {/* Right side - Dashboard and New Session */}
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white/80 sm:hover:text-white p-2">
                    <LayoutDashboard className="w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  onClick={handleCreateSession}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">New Session</span>
                </Button>
              </div>
            </div>

            {/* Main Content - Side by Side Layout */}
            <div className="flex-1 p-4 sm:p-6 overflow-hidden">
              <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
      </BackgroundWrapper>
    </AuthGuard>
  )
}

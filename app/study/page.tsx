"use client"

import { useState } from "react"
import { TechniqueSelector } from "@/components/study/technique-selector"
import { PomodoroTimer } from "@/components/study/pomodoro-timer"
import { FeynmanTechnique } from "@/components/study/feynman-technique"
import { ActiveRecall } from "@/components/study/active-recall"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function StudyPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)

  const handleTechniqueSelect = (technique: string) => {
    setSelectedTechnique(technique)
  }

  const handleSessionComplete = () => {
    console.log("[v0] Study session completed:", selectedTechnique)
    setSelectedTechnique(null)
  }

  const renderTechnique = () => {
    switch (selectedTechnique) {
      case "pomodoro":
        return <PomodoroTimer onComplete={handleSessionComplete} />
      case "feynman":
        return <FeynmanTechnique onComplete={handleSessionComplete} />
      case "active-recall":
        return <ActiveRecall onComplete={handleSessionComplete} />
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            This technique is coming soon!
            <div className="mt-4">
              <Button onClick={() => setSelectedTechnique(null)}>Back to Techniques</Button>
            </div>
          </div>
        )
    }
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        {selectedTechnique ? (
          <div className="space-y-4">
            <Button onClick={() => setSelectedTechnique(null)} variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Techniques
            </Button>
            {renderTechnique()}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Study Techniques</h1>
              <p className="text-muted-foreground">Choose a study technique to start your focused learning session</p>
            </div>
            <TechniqueSelector onSelect={handleTechniqueSelect} />
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

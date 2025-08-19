"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, RotateCcw, Clock } from "lucide-react"

type PomodoroPhase = "work" | "shortBreak" | "longBreak"

const PHASE_DURATIONS = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
}

const PHASE_LABELS = {
  work: "Focus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
}

export function PomodoroTimer({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<PomodoroPhase>("work")
  const [timeLeft, setTimeLeft] = useState(PHASE_DURATIONS.work)
  const [isRunning, setIsRunning] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      handlePhaseComplete()
    }
  }, [timeLeft])

  const handlePhaseComplete = () => {
    setIsRunning(false)

    if (phase === "work") {
      const newCount = completedPomodoros + 1
      setCompletedPomodoros(newCount)

      // After 4 pomodoros, take a long break
      const nextPhase = newCount % 4 === 0 ? "longBreak" : "shortBreak"
      setPhase(nextPhase)
      setTimeLeft(PHASE_DURATIONS[nextPhase])
    } else {
      // Break is over, back to work
      setPhase("work")
      setTimeLeft(PHASE_DURATIONS.work)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(PHASE_DURATIONS[phase])
  }

  const stopSession = () => {
    setIsRunning(false)
    onComplete()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((PHASE_DURATIONS[phase] - timeLeft) / PHASE_DURATIONS[phase]) * 100

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Clock className="h-5 w-5" />
          Pomodoro Timer
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {PHASE_LABELS[phase]} • {completedPomodoros} completed
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-primary mb-2">{formatTime(timeLeft)}</div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Pomodoro Counter */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i <= completedPomodoros % 4 ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2">
          <Button onClick={toggleTimer} size="lg">
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={stopSession} variant="outline" size="lg">
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        {/* Phase Info */}
        <div className="text-center text-sm text-muted-foreground">
          {phase === "work" && "Stay focused! Avoid distractions during this session."}
          {phase === "shortBreak" && "Take a short break. Stretch, hydrate, or relax."}
          {phase === "longBreak" && "Enjoy your long break! You've earned it."}
        </div>
      </CardContent>
    </Card>
  )
}

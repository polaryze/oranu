"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Brain, Target, Repeat, Map } from "lucide-react"

const techniques = [
  {
    id: "pomodoro",
    name: "Pomodoro Technique",
    description: "25-minute focused work sessions with 5-minute breaks",
    icon: Clock,
    color: "text-red-600",
    bgColor: "bg-red-50 hover:bg-red-100",
  },
  {
    id: "feynman",
    name: "Feynman Technique",
    description: "Learn by explaining concepts in simple terms",
    icon: Brain,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    id: "active-recall",
    name: "Active Recall",
    description: "Test yourself with questions and flashcards",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100",
  },
  {
    id: "spaced-repetition",
    name: "Spaced Repetition",
    description: "Review material at increasing intervals",
    icon: Repeat,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100",
  },
  {
    id: "mind-mapping",
    name: "Mind Mapping",
    description: "Visual representation of information and concepts",
    icon: Map,
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100",
  },
]

export function TechniqueSelector({ onSelect }: { onSelect: (technique: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {techniques.map((technique) => {
        const Icon = technique.icon
        return (
          <Card key={technique.id} className={`cursor-pointer transition-colors ${technique.bgColor}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${technique.color}`} />
                {technique.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{technique.description}</CardDescription>
              <Button onClick={() => onSelect(technique.id)} className="w-full">
                Start Session
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

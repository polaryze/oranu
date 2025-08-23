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
    color: "text-primary",
    bgColor: "bg-primary/10 hover:bg-primary/20",
  },
  {
    id: "feynman",
    name: "Feynman Technique",
    description: "Learn by explaining concepts in simple terms",
    icon: Brain,
    color: "text-secondary",
    bgColor: "bg-secondary/10 hover:bg-secondary/20",
  },
  {
    id: "active-recall",
    name: "Active Recall",
    description: "Test yourself with questions and flashcards",
    icon: Target,
    color: "text-accent",
    bgColor: "bg-accent/10 hover:bg-accent/20",
  },
  {
    id: "spaced-repetition",
    name: "Spaced Repetition",
    description: "Review material at increasing intervals",
    icon: Repeat,
    color: "text-primary",
    bgColor: "bg-primary/10 hover:bg-primary/20",
  },
  {
    id: "mind-mapping",
    name: "Mind Mapping",
    description: "Visual representation of information and concepts",
    icon: Map,
    color: "text-secondary",
    bgColor: "bg-secondary/10 hover:bg-secondary/20",
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

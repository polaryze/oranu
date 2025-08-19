"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, ArrowRight, CheckCircle } from "lucide-react"

const steps = [
  {
    title: "Choose Your Concept",
    description: "Pick a topic or concept you want to understand better",
    placeholder: "e.g., Photosynthesis, Quantum Mechanics, Supply and Demand",
  },
  {
    title: "Explain It Simply",
    description: "Write an explanation as if teaching a child",
    placeholder:
      "Use simple words and avoid jargon. Pretend you're explaining to someone who has never heard of this concept before...",
  },
  {
    title: "Identify Gaps",
    description: "What parts were difficult to explain? What did you struggle with?",
    placeholder: "List the areas where your explanation felt unclear or where you used complex terms...",
  },
  {
    title: "Review & Improve",
    description: "Go back to your sources and improve your explanation",
    placeholder: "Rewrite your explanation with better understanding and simpler language...",
  },
]

export function FeynmanTechnique({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<string[]>(["", "", "", ""])

  const updateResponse = (stepIndex: number, value: string) => {
    const newResponses = [...responses]
    newResponses[stepIndex] = value
    setResponses(newResponses)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Feynman Technique
        </CardTitle>
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
          <p className="text-muted-foreground mb-4">{currentStepData.description}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="response">Your Response</Label>
          {isFirstStep ? (
            <Input
              id="response"
              placeholder={currentStepData.placeholder}
              value={responses[currentStep]}
              onChange={(e) => updateResponse(currentStep, e.target.value)}
            />
          ) : (
            <Textarea
              id="response"
              placeholder={currentStepData.placeholder}
              value={responses[currentStep]}
              onChange={(e) => updateResponse(currentStep, e.target.value)}
              rows={6}
            />
          )}
        </div>

        <div className="flex justify-between">
          <Button onClick={prevStep} variant="outline" disabled={isFirstStep}>
            Previous
          </Button>
          <Button onClick={nextStep} disabled={!responses[currentStep].trim()}>
            {isLastStep ? "Complete Session" : "Next Step"}
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="text-center text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
      </CardContent>
    </Card>
  )
}

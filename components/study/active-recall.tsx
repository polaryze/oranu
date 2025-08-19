"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, Eye, EyeOff } from "lucide-react"

interface Question {
  id: number
  question: string
  answer: string
  difficulty: "easy" | "medium" | "hard"
}

export function ActiveRecall({ onComplete }: { onComplete: () => void }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [reviewMode, setReviewMode] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")

  const addQuestion = () => {
    if (currentQuestion.trim() && currentAnswer.trim()) {
      const newQuestion: Question = {
        id: Date.now(),
        question: currentQuestion,
        answer: currentAnswer,
        difficulty: "medium",
      }
      setQuestions([...questions, newQuestion])
      setCurrentQuestion("")
      setCurrentAnswer("")
    }
  }

  const startReview = () => {
    if (questions.length > 0) {
      setReviewMode(true)
      setCurrentReviewIndex(0)
      setShowAnswer(false)
      setUserAnswer("")
    }
  }

  const nextQuestion = () => {
    if (currentReviewIndex < questions.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1)
      setShowAnswer(false)
      setUserAnswer("")
    } else {
      onComplete()
    }
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  if (reviewMode && questions.length > 0) {
    const question = questions[currentReviewIndex]

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Recall Review
            </div>
            <Badge variant="outline">
              {currentReviewIndex + 1} of {questions.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Question:</h3>
            <p className="text-base p-4 bg-muted rounded-lg">{question.question}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-answer">Your Answer</Label>
            <Textarea
              id="user-answer"
              placeholder="Write your answer here before revealing the correct answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-center">
            <Button onClick={toggleAnswer} variant="outline">
              {showAnswer ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </Button>
          </div>

          {showAnswer && (
            <div>
              <h4 className="font-semibold mb-2">Correct Answer:</h4>
              <p className="p-4 bg-green-50 border border-green-200 rounded-lg">{question.answer}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={() => setReviewMode(false)} variant="outline">
              Back to Questions
            </Button>
            <Button onClick={nextQuestion} disabled={!showAnswer}>
              {currentReviewIndex === questions.length - 1 ? "Complete Session" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Active Recall Session
        </CardTitle>
        <p className="text-muted-foreground">Create questions and test your knowledge</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              placeholder="What question do you want to test yourself on?"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              placeholder="Write the correct answer here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              rows={3}
            />
          </div>
          <Button onClick={addQuestion} disabled={!currentQuestion.trim() || !currentAnswer.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>

        {questions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Your Questions ({questions.length})</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {questions.map((q, index) => (
                <div key={q.id} className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">
                    Q{index + 1}: {q.question}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={startReview}>Start Review</Button>
              <Button onClick={onComplete} variant="outline">
                Complete Session
              </Button>
            </div>
          </div>
        )}

        {questions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Add some questions to start your active recall session
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const subjectData = [
  { subject: "Mathematics", hours: 12.5, color: "hsl(var(--chart-1))" },
  { subject: "Physics", hours: 8.3, color: "hsl(var(--chart-2))" },
  { subject: "Chemistry", hours: 6.7, color: "hsl(var(--chart-3))" },
  { subject: "Biology", hours: 4.2, color: "hsl(var(--chart-4))" },
  { subject: "History", hours: 3.1, color: "hsl(var(--chart-5))" },
]

export function SubjectBreakdown() {
  const total = subjectData.reduce((sum, item) => sum + item.hours, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Time by Subject</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <ChartContainer
              config={{
                hours: {
                  label: "Hours",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={subjectData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="hours">
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="space-y-2">
            {subjectData.map((item) => (
              <div key={item.subject} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium">{item.subject}</span>
                <span className="text-sm text-muted-foreground">
                  {item.hours}h ({Math.round((item.hours / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"

const studyTimeData = [
  { date: "Mon", hours: 2.5, goal: 3 },
  { date: "Tue", hours: 3.2, goal: 3 },
  { date: "Wed", hours: 1.8, goal: 3 },
  { date: "Thu", hours: 4.1, goal: 3 },
  { date: "Fri", hours: 2.9, goal: 3 },
  { date: "Sat", hours: 3.5, goal: 3 },
  { date: "Sun", hours: 2.2, goal: 3 },
]

export function StudyTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            hours: {
              label: "Study Hours",
              color: "hsl(var(--chart-1))",
            },
            goal: {
              label: "Daily Goal",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={studyTimeData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="var(--color-hours)"
                fill="var(--color-hours)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="goal"
                stroke="var(--color-goal)"
                strokeDasharray="5 5"
                fill="none"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

import { useMemo, useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useWorkoutLogs } from "@/hooks/use-workout-logs"
import { useWalkLogs } from "@/hooks/use-walk-logs"
import {
  computeWeeklyFrequency,
  computeWeightProgression,
  computeCompletionRate,
  getUniqueExercises,
} from "@/lib/analytics-utils"

const frequencyConfig = {
  workouts: { label: "Workouts", color: "var(--color-primary)" },
  walks: { label: "Walks", color: "var(--color-muted-foreground)" },
}

const weightConfig = {
  weight: { label: "Weight (kg)", color: "var(--color-primary)" },
}

const completionConfig = {
  completion: { label: "Completion %", color: "var(--color-primary)" },
}

export default function AnalyticsPage() {
  const { logs } = useWorkoutLogs()
  const { walkLogs } = useWalkLogs()
  const [selectedExercise, setSelectedExercise] = useState("")

  const exercises = useMemo(() => getUniqueExercises(logs), [logs])
  const frequencyData = useMemo(
    () => computeWeeklyFrequency(logs, walkLogs),
    [logs, walkLogs]
  )
  const completionData = useMemo(() => computeCompletionRate(logs), [logs])

  const exerciseId = selectedExercise || exercises[0]?.id || ""
  const weightData = useMemo(
    () => (exerciseId ? computeWeightProgression(logs, exerciseId) : []),
    [logs, exerciseId]
  )

  const hasData = logs.length > 0 || walkLogs.length > 0

  if (!hasData) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Analytics</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Complete some workouts or log walks to see your analytics here.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Analytics</h1>

      {/* Weekly Frequency */}
      <Card>
        <CardContent className="py-4">
          <p className="mb-3 text-sm font-medium">Weekly Frequency</p>
          <ChartContainer config={frequencyConfig} className="h-[200px] w-full">
            <BarChart data={frequencyData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="week" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} fontSize={10} tickLine={false} axisLine={false} width={24} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="workouts" fill="var(--color-workouts)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="walks" fill="var(--color-walks)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weight Progression */}
      {exercises.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-medium">Weight Progression</p>
              <select
                value={exerciseId}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-1 text-xs"
              >
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>
            {weightData.length > 0 ? (
              <ChartContainer config={weightConfig} className="h-[200px] w-full">
                <LineChart data={weightData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} width={32} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="var(--color-weight)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <p className="py-8 text-center text-xs text-muted-foreground">
                No data for this exercise yet.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Completion Rate */}
      {completionData.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <p className="mb-3 text-sm font-medium">Completion Rate</p>
            <ChartContainer config={completionConfig} className="h-[200px] w-full">
              <LineChart data={completionData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} fontSize={10} tickLine={false} axisLine={false} width={32} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="var(--color-completion)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

import { format, parseISO, startOfWeek, subWeeks } from "date-fns"
import type { WorkoutLog } from "@/types"

export interface WeeklyFrequencyPoint {
  week: string
  workouts: number
}

export interface WeightProgressionPoint {
  date: string
  weight: number
}

export interface CompletionRatePoint {
  date: string
  completion: number
  label: string
}

export interface ExerciseOption {
  id: string
  name: string
}

export function computeWeeklyFrequency(
  workoutLogs: WorkoutLog[],
  weeks = 12
): WeeklyFrequencyPoint[] {
  const now = new Date()
  const result: WeeklyFrequencyPoint[] = []

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 })
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const weekLabel = format(weekStart, "MMM d")

    const workouts = workoutLogs.filter((log) => {
      const d = parseISO(log.date)
      return d >= weekStart && d <= weekEnd
    }).length

    result.push({ week: weekLabel, workouts })
  }

  return result
}

export function computeWeightProgression(
  workoutLogs: WorkoutLog[],
  exerciseId: string
): WeightProgressionPoint[] {
  const points: WeightProgressionPoint[] = []

  // Logs are stored newest-first, reverse to get chronological order
  const sorted = [...workoutLogs].reverse()

  for (const log of sorted) {
    const exercise = log.exercises.find((e) => e.exerciseId === exerciseId)
    if (!exercise) continue

    const completedSets = exercise.sets.filter((s) => s.completed)
    if (completedSets.length === 0) continue

    const maxWeight = Math.max(...completedSets.map((s) => s.actualWeightKg))
    points.push({
      date: format(parseISO(log.date), "MMM d"),
      weight: maxWeight,
    })
  }

  return points
}

export function computeCompletionRate(
  workoutLogs: WorkoutLog[]
): CompletionRatePoint[] {
  const sorted = [...workoutLogs].reverse()

  return sorted.map((log) => ({
    date: format(parseISO(log.date), "MMM d"),
    completion: log.completionPercent,
    label: log.templateName,
  }))
}

export function getUniqueExercises(workoutLogs: WorkoutLog[]): ExerciseOption[] {
  const seen = new Map<string, string>()

  for (const log of workoutLogs) {
    for (const exercise of log.exercises) {
      if (!seen.has(exercise.exerciseId)) {
        seen.set(exercise.exerciseId, exercise.exerciseName)
      }
    }
  }

  return Array.from(seen, ([id, name]) => ({ id, name })).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}

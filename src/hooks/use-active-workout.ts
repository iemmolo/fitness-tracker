import { useLocalStorage } from "./use-local-storage"
import { STORAGE_KEYS } from "@/lib/storage"
import { createExerciseLogs, activeWorkoutToLog } from "@/lib/workout-utils"
import { getTodayISO } from "@/lib/date-utils"
import type { ActiveWorkout, WorkoutTemplate, WorkoutLog, ExerciseLog, CardioType } from "@/types"

export function useActiveWorkout() {
  const [activeWorkout, setActiveWorkout, clearActiveWorkout] =
    useLocalStorage<ActiveWorkout | null>(STORAGE_KEYS.ACTIVE_WORKOUT, null)

  function startWorkout(template: WorkoutTemplate) {
    const workout: ActiveWorkout = {
      templateId: template.id,
      templateName: template.name,
      date: getTodayISO(),
      startedAt: new Date().toISOString(),
      exercises: createExerciseLogs(template.exercises),
    }
    setActiveWorkout(workout)
    return workout
  }

  function setCardioType(cardioType: CardioType) {
    setActiveWorkout((prev) => {
      if (!prev) return prev
      return { ...prev, cardioType }
    })
  }

  function toggleSet(exerciseIndex: number, setIndex: number) {
    setActiveWorkout((prev) => {
      if (!prev) return prev
      const exercises = prev.exercises.map((ex, ei) => {
        if (ei !== exerciseIndex) return ex
        const sets = ex.sets.map((s, si) => {
          if (si !== setIndex) return s
          return { ...s, completed: !s.completed }
        })
        return { ...ex, sets }
      })
      return { ...prev, exercises }
    })
  }

  function updateWeight(exerciseIndex: number, setIndex: number, weight: number) {
    setActiveWorkout((prev) => {
      if (!prev) return prev
      const exercises = prev.exercises.map((ex, ei) => {
        if (ei !== exerciseIndex) return ex
        const sets = ex.sets.map((s, si) => {
          if (si !== setIndex) return s
          return { ...s, actualWeightKg: weight }
        })
        return { ...ex, sets }
      })
      return { ...prev, exercises }
    })
  }

  function updateAllWeights(exerciseIndex: number, weight: number) {
    setActiveWorkout((prev) => {
      if (!prev) return prev
      const exercises: ExerciseLog[] = prev.exercises.map((ex, ei) => {
        if (ei !== exerciseIndex) return ex
        return {
          ...ex,
          sets: ex.sets.map((s) => ({ ...s, actualWeightKg: weight })),
        }
      })
      return { ...prev, exercises }
    })
  }

  function completeWorkout(): WorkoutLog | null {
    if (!activeWorkout) return null
    const log = activeWorkoutToLog(activeWorkout, crypto.randomUUID())
    clearActiveWorkout()
    return log
  }

  function discardWorkout() {
    clearActiveWorkout()
  }

  return {
    activeWorkout,
    startWorkout,
    toggleSet,
    updateWeight,
    updateAllWeights,
    setCardioType,
    completeWorkout,
    discardWorkout,
  }
}

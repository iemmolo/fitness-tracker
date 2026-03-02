import type { ExerciseTemplate, ExerciseLog, ActiveWorkout, WorkoutLog } from "@/types"

export function createExerciseLogs(exercises: ExerciseTemplate[]): ExerciseLog[] {
  return exercises.map((ex) => ({
    exerciseId: ex.id,
    exerciseName: ex.name,
    targetSets: ex.sets,
    targetReps: ex.reps,
    sets: Array.from({ length: ex.sets }, (_, i) => ({
      setNumber: i + 1,
      completed: false,
      actualWeightKg: ex.weightKg,
    })),
  }))
}

export function calcCompletionPercent(exercises: ExerciseLog[]): number {
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0)
  if (totalSets === 0) return 0
  const completedSets = exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
    0
  )
  return Math.round((completedSets / totalSets) * 100)
}

export function activeWorkoutToLog(active: ActiveWorkout, id: string): WorkoutLog {
  return {
    id,
    templateId: active.templateId,
    templateName: active.templateName,
    date: active.date,
    startedAt: active.startedAt,
    completedAt: new Date().toISOString(),
    exercises: active.exercises,
    completionPercent: calcCompletionPercent(active.exercises),
  }
}

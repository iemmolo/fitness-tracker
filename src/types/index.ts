export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

// Workout templates (pre-configured)
export interface ExerciseTemplate {
  id: string
  name: string
  sets: number
  reps: number
  weightKg: number
  notes?: string
}

export interface WorkoutTemplate {
  id: string
  name: string
  exercises: ExerciseTemplate[]
}

export interface WorkoutSchedule {
  schedule: Partial<Record<DayOfWeek, string>> // maps day -> templateId
  templates: WorkoutTemplate[]
}

// Cardio type tracked per workout
export type CardioType = "gym-cardio" | "walk"

// Completed workout logs
export interface SetLog {
  setNumber: number
  completed: boolean
  actualWeightKg: number
}

export interface ExerciseLog {
  exerciseId: string
  exerciseName: string
  targetSets: number
  targetReps: number
  sets: SetLog[]
}

export interface WorkoutLog {
  id: string
  templateId: string
  templateName: string
  date: string // ISO date string YYYY-MM-DD
  startedAt: string // ISO datetime
  completedAt?: string // ISO datetime
  exercises: ExerciseLog[]
  completionPercent: number
  cardioType?: CardioType
}

// In-progress workout (persisted to localStorage for crash resilience)
export interface ActiveWorkout {
  templateId: string
  templateName: string
  date: string // ISO date string YYYY-MM-DD
  startedAt: string // ISO datetime
  exercises: ExerciseLog[]
  cardioType?: CardioType
}

// Data export/import
export interface AppData {
  version: 1
  workoutSchedule: WorkoutSchedule
  workoutLogs: WorkoutLog[]
  activeWorkout: ActiveWorkout | null
  exportedAt: string
}

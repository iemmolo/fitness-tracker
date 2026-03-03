export const STORAGE_KEYS = {
  WORKOUT_SCHEDULE: "fitness-tracker:workout-schedule",
  WORKOUT_LOGS: "fitness-tracker:workout-logs",
  ACTIVE_WORKOUT: "fitness-tracker:active-workout",
} as const

export function getStorageItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback
  } catch {
    return fallback
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key)
}

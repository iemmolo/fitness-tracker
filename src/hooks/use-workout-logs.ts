import { useLocalStorage } from "./use-local-storage"
import { STORAGE_KEYS } from "@/lib/storage"
import type { WorkoutLog } from "@/types"

export function useWorkoutLogs() {
  const [logs, setLogs] = useLocalStorage<WorkoutLog[]>(
    STORAGE_KEYS.WORKOUT_LOGS,
    []
  )

  function addLog(log: WorkoutLog) {
    setLogs((prev) => [log, ...prev])
  }

  return { logs, setLogs, addLog }
}

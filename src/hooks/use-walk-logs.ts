import { useCallback, useMemo } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS } from "@/lib/storage"
import { getTodayISO } from "@/lib/date-utils"
import type { WalkLog } from "@/types"

export function useWalkLogs() {
  const [walkLogs, setWalkLogs] = useLocalStorage<WalkLog[]>(
    STORAGE_KEYS.WALK_LOGS,
    []
  )

  const today = getTodayISO()

  const isTodayCompleted = useMemo(
    () => walkLogs.some((log) => log.date === today && log.completed),
    [walkLogs, today]
  )

  const toggleToday = useCallback(() => {
    setWalkLogs((prev) => {
      const existing = prev.findIndex((log) => log.date === today)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], completed: !updated[existing].completed }
        return updated
      }
      return [...prev, { date: today, completed: true }]
    })
  }, [setWalkLogs, today])

  return { walkLogs, setWalkLogs, toggleToday, isTodayCompleted }
}

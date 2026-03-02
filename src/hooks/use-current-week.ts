import { useMemo } from "react"
import { isDateInCurrentWeek } from "@/lib/date-utils"
import type { WorkoutLog, WalkLog } from "@/types"

export function useCurrentWeek(logs: WorkoutLog[], walkLogs: WalkLog[] = []) {
  const weekLogs = useMemo(
    () => logs.filter((log) => isDateInCurrentWeek(log.date)),
    [logs]
  )

  const weekWalkCount = useMemo(
    () => walkLogs.filter((log) => log.completed && isDateInCurrentWeek(log.date)).length,
    [walkLogs]
  )

  return {
    weekLogs,
    weekCount: weekLogs.length,
    weekTarget: 3,
    weekWalkCount,
    weekWalkTarget: 7,
  }
}

import { useMemo } from "react"
import { isDateInCurrentWeek } from "@/lib/date-utils"
import type { WorkoutLog } from "@/types"

export function useCurrentWeek(logs: WorkoutLog[]) {
  const weekLogs = useMemo(
    () => logs.filter((log) => isDateInCurrentWeek(log.date)),
    [logs]
  )

  return {
    weekLogs,
    weekCount: weekLogs.length,
    weekTarget: 3,
  }
}

import { useLocalStorage } from "./use-local-storage"
import { STORAGE_KEYS } from "@/lib/storage"
import { DEFAULT_PLAN } from "@/lib/default-plan"
import type { WorkoutSchedule, WorkoutTemplate } from "@/types"

export function useWorkoutPlan() {
  const [plan, setPlan] = useLocalStorage<WorkoutSchedule>(
    STORAGE_KEYS.WORKOUT_SCHEDULE,
    DEFAULT_PLAN
  )

  function getTemplate(templateId: string): WorkoutTemplate | undefined {
    return plan.templates.find((t) => t.id === templateId)
  }

  function getTodayTemplate(day: string): WorkoutTemplate | undefined {
    const templateId = plan.schedule[day as keyof typeof plan.schedule]
    return templateId ? getTemplate(templateId) : undefined
  }

  return { plan, setPlan, getTemplate, getTodayTemplate }
}

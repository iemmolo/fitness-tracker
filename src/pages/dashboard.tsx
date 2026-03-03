import { CountdownCard } from "@/components/dashboard/countdown-card"
import { WeeklyAdherence } from "@/components/dashboard/weekly-adherence"
import { StartWorkoutCard } from "@/components/dashboard/start-workout-card"
import { useWorkoutPlan } from "@/hooks/use-workout-plan"
import { useWorkoutLogs } from "@/hooks/use-workout-logs"
import { useActiveWorkout } from "@/hooks/use-active-workout"
import { useCurrentWeek } from "@/hooks/use-current-week"

export default function DashboardPage() {
  const { plan } = useWorkoutPlan()
  const { logs } = useWorkoutLogs()
  const { activeWorkout, startWorkout } = useActiveWorkout()
  const { weekCount, weekTarget } = useCurrentWeek(logs)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <CountdownCard />
      <WeeklyAdherence
        count={weekCount}
        target={weekTarget}
      />
      <StartWorkoutCard
        plan={plan}
        activeWorkout={activeWorkout}
        onStart={startWorkout}
      />
    </div>
  )
}

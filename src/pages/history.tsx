import { WorkoutList } from "@/components/history/workout-list"
import { useWorkoutLogs } from "@/hooks/use-workout-logs"

export default function HistoryPage() {
  const { logs } = useWorkoutLogs()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">History</h1>
      <WorkoutList logs={logs} />
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface WeeklyAdherenceProps {
  count: number
  target: number
}

export function WeeklyAdherence({ count, target }: WeeklyAdherenceProps) {
  const workoutPct = Math.min(100, Math.round((count / target) * 100))

  return (
    <Card>
      <CardContent className="py-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">This Week</p>
          <p className="text-sm tabular-nums text-muted-foreground">
            {count}/{target} workouts
          </p>
        </div>
        <Progress value={workoutPct} className="h-2" />
      </CardContent>
    </Card>
  )
}

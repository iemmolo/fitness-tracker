import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface WeeklyAdherenceProps {
  count: number
  target: number
  walkCount: number
  walkTarget: number
}

export function WeeklyAdherence({ count, target, walkCount, walkTarget }: WeeklyAdherenceProps) {
  const workoutPct = Math.min(100, Math.round((count / target) * 100))
  const walkPct = Math.min(100, Math.round((walkCount / walkTarget) * 100))

  return (
    <Card>
      <CardContent className="py-4 space-y-3">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">This Week</p>
            <p className="text-sm tabular-nums text-muted-foreground">
              {count}/{target} workouts
            </p>
          </div>
          <Progress value={workoutPct} className="h-2" />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Walks</p>
            <p className="text-sm tabular-nums text-muted-foreground">
              {walkCount}/{walkTarget} days
            </p>
          </div>
          <Progress value={walkPct} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

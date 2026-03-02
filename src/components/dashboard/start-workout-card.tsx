import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw } from "lucide-react"
import { getNextScheduledDay, getTodayDayOfWeek, dayOfWeekLabel } from "@/lib/date-utils"
import type { WorkoutSchedule, ActiveWorkout, WorkoutTemplate } from "@/types"

interface StartWorkoutCardProps {
  plan: WorkoutSchedule
  activeWorkout: ActiveWorkout | null
  onStart: (template: WorkoutTemplate) => void
}

export function StartWorkoutCard({ plan, activeWorkout, onStart }: StartWorkoutCardProps) {
  const navigate = useNavigate()
  const nextDay = getNextScheduledDay(plan.schedule)

  if (activeWorkout) {
    return (
      <Card className="border-primary/50">
        <CardContent className="py-4">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary">In Progress</Badge>
            <span className="text-sm font-medium">{activeWorkout.templateName}</span>
          </div>
          <Button className="w-full" size="lg" onClick={() => navigate("/workout")}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Resume Workout
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!nextDay) {
    return (
      <Card>
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">No workouts scheduled</p>
        </CardContent>
      </Card>
    )
  }

  const templateId = plan.schedule[nextDay.day]
  const template = plan.templates.find((t) => t.id === templateId)

  if (!template) return null

  const today = getTodayDayOfWeek()
  const isToday = nextDay.day === today

  return (
    <Card>
      <CardContent className="py-4">
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">
            {isToday ? "Today's Workout" : `Next: ${dayOfWeekLabel(nextDay.day)}`}
          </p>
          <p className="text-lg font-semibold">{template.name}</p>
          <p className="text-xs text-muted-foreground">
            {template.exercises.length} exercises
          </p>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            onStart(template)
            navigate("/workout")
          }}
        >
          <Play className="mr-2 h-4 w-4" />
          {isToday ? "Start Today's Workout" : "Start Workout"}
        </Button>
      </CardContent>
    </Card>
  )
}

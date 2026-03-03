import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { formatDate, formatDateTime } from "@/lib/date-utils"
import type { WorkoutLog } from "@/types"

interface WorkoutListProps {
  logs: WorkoutLog[]
}

function WorkoutItem({ log }: { log: WorkoutLog }) {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardContent className="flex cursor-pointer items-center justify-between py-3">
            <div>
              <p className="font-medium">{log.templateName}</p>
              <p className="text-xs text-muted-foreground">{formatDate(log.date)}</p>
            </div>
            <div className="flex items-center gap-2">
              {log.cardioType && (
                <Badge variant="outline">
                  {log.cardioType === "gym-cardio" ? "Gym Cardio" : "Walk"}
                </Badge>
              )}
              <Badge variant={log.completionPercent === 100 ? "default" : "secondary"}>
                {log.completionPercent}%
              </Badge>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border px-6 pb-4 pt-3">
            <p className="mb-2 text-xs text-muted-foreground">
              {formatDateTime(log.startedAt)}
              {log.completedAt ? ` - ${formatDateTime(log.completedAt)}` : ""}
            </p>
            <div className="space-y-2">
              {log.exercises.map((ex) => {
                const done = ex.sets.filter((s) => s.completed).length
                return (
                  <div key={ex.exerciseId} className="flex items-center justify-between text-sm">
                    <span>{ex.exerciseName}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {done}/{ex.sets.length} sets
                      {ex.sets[0]?.actualWeightKg > 0 &&
                        ` @ ${ex.sets[0].actualWeightKg} kg`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export function WorkoutList({ logs }: WorkoutListProps) {
  if (logs.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p className="text-sm">No workouts yet</p>
        <p className="text-xs">Complete your first workout to see it here</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <WorkoutItem key={log.id} log={log} />
      ))}
    </div>
  )
}

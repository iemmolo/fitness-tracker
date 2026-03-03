import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExerciseItem } from "@/components/workout/exercise-item"
import { useActiveWorkout } from "@/hooks/use-active-workout"
import { useWorkoutLogs } from "@/hooks/use-workout-logs"
import { calcCompletionPercent } from "@/lib/workout-utils"
import { CheckCircle, X } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { CardioType } from "@/types"

export default function ActiveWorkoutPage() {
  const navigate = useNavigate()
  const {
    activeWorkout,
    toggleSet,
    updateWeight,
    updateAllWeights,
    setCardioType,
    completeWorkout,
    discardWorkout,
  } = useActiveWorkout()
  const { addLog } = useWorkoutLogs()

  if (!activeWorkout) {
    navigate("/", { replace: true })
    return null
  }

  const completionPct = calcCompletionPercent(activeWorkout.exercises)

  function handleComplete() {
    const log = completeWorkout()
    if (log) {
      addLog(log)
      toast.success(`Workout complete! ${log.completionPercent}%`)
      navigate("/", { replace: true })
    }
  }

  function handleDiscard() {
    discardWorkout()
    navigate("/", { replace: true })
  }

  const cardioOptions: { value: CardioType; label: string }[] = [
    { value: "gym-cardio", label: "Gym Cardio" },
    { value: "walk", label: "Walk" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{activeWorkout.templateName}</h1>
          <p className="text-xs text-muted-foreground">
            {completionPct}% complete
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <X className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Discard workout?</DialogTitle>
              <DialogDescription>
                This will discard your current progress. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={handleDiscard}>
                Discard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Progress value={completionPct} className="h-2" />

      {/* Cardio Type */}
      <div className="flex gap-2">
        {cardioOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={activeWorkout.cardioType === opt.value ? "default" : "outline"}
            size="sm"
            className="flex-1"
            onClick={() => setCardioType(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {activeWorkout.exercises.map((exercise, i) => (
          <ExerciseItem
            key={exercise.exerciseId}
            exercise={exercise}
            exerciseIndex={i}
            onToggleSet={toggleSet}
            onUpdateWeight={updateWeight}
            onUpdateAllWeights={updateAllWeights}
          />
        ))}
      </div>

      <Button className="w-full" size="lg" onClick={handleComplete}>
        <CheckCircle className="mr-2 h-4 w-4" />
        Complete Workout
      </Button>
    </div>
  )
}

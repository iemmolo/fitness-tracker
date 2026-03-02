import { SetCheckbox } from "./set-checkbox"
import { WeightEditor } from "./weight-editor"
import { Separator } from "@/components/ui/separator"
import type { ExerciseLog } from "@/types"

interface ExerciseItemProps {
  exercise: ExerciseLog
  exerciseIndex: number
  onToggleSet: (exerciseIndex: number, setIndex: number) => void
  onUpdateWeight: (exerciseIndex: number, setIndex: number, weight: number) => void
  onUpdateAllWeights: (exerciseIndex: number, weight: number) => void
}

export function ExerciseItem({
  exercise,
  exerciseIndex,
  onToggleSet,
  onUpdateWeight,
  onUpdateAllWeights,
}: ExerciseItemProps) {
  const completedCount = exercise.sets.filter((s) => s.completed).length
  const allDone = completedCount === exercise.sets.length

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`font-medium ${allDone ? "text-muted-foreground line-through" : ""}`}
          >
            {exercise.exerciseName}
          </h3>
          <p className="text-xs text-muted-foreground">
            {exercise.targetSets} x {exercise.targetReps} reps
          </p>
        </div>
        <span className="text-sm tabular-nums text-muted-foreground">
          {completedCount}/{exercise.sets.length}
        </span>
      </div>

      <div className="space-y-1">
        {exercise.sets.map((set, si) => (
          <div
            key={set.setNumber}
            className="flex items-center justify-between rounded-lg bg-muted/50 px-2"
          >
            <SetCheckbox
              setNumber={set.setNumber}
              completed={set.completed}
              onToggle={() => onToggleSet(exerciseIndex, si)}
            />
            <WeightEditor
              weightKg={set.actualWeightKg}
              onSave={(w) => onUpdateWeight(exerciseIndex, si, w)}
              onSaveAll={(w) => onUpdateAllWeights(exerciseIndex, w)}
            />
          </div>
        ))}
      </div>
      <Separator />
    </div>
  )
}

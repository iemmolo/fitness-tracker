import { Checkbox } from "@/components/ui/checkbox"

interface SetCheckboxProps {
  setNumber: number
  completed: boolean
  onToggle: () => void
}

export function SetCheckbox({ setNumber, completed, onToggle }: SetCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-lg px-2"
    >
      <Checkbox checked={completed} className="pointer-events-none" />
      <span
        className={`text-sm tabular-nums ${
          completed ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        Set {setNumber}
      </span>
    </button>
  )
}

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"

interface WeightEditorProps {
  weightKg: number
  onSave: (weight: number) => void
  onSaveAll: (weight: number) => void
}

export function WeightEditor({ weightKg, onSave, onSaveAll }: WeightEditorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(String(weightKg))

  function handleOpen(isOpen: boolean) {
    if (isOpen) setValue(String(weightKg))
    setOpen(isOpen)
  }

  function save(applyAll: boolean) {
    const num = parseFloat(value)
    if (isNaN(num) || num < 0) return
    if (applyAll) {
      onSaveAll(num)
    } else {
      onSave(num)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-1 rounded-md px-2 text-sm tabular-nums text-muted-foreground hover:text-foreground"
        >
          {weightKg > 0 ? `${weightKg} kg` : "BW"}
          <Pencil className="h-3 w-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">
              Weight (kg)
            </label>
            <Input
              type="number"
              inputMode="decimal"
              step="0.5"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") save(false)
              }}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => save(false)}>
              This set
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => save(true)}
            >
              All sets
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

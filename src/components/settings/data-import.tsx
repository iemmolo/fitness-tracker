import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { STORAGE_KEYS, setStorageItem } from "@/lib/storage"
import type { AppData } from "@/types"
import { toast } from "sonner"

interface DataImportProps {
  onImported: () => void
}

export function DataImport({ onImported }: DataImportProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as AppData

        if (data.version !== 1) {
          toast.error("Unsupported backup version")
          return
        }

        setStorageItem(STORAGE_KEYS.WORKOUT_SCHEDULE, data.workoutSchedule)
        setStorageItem(STORAGE_KEYS.WORKOUT_LOGS, data.workoutLogs)
        if (data.activeWorkout) {
          setStorageItem(STORAGE_KEYS.ACTIVE_WORKOUT, data.activeWorkout)
        }
        setStorageItem(STORAGE_KEYS.WALK_LOGS, data.walkLogs ?? [])

        toast.success("Data restored successfully")
        onImported()
      } catch {
        toast.error("Invalid backup file")
      }
    }
    reader.readAsText(file)

    // Reset input so same file can be selected again
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <Card>
      <CardContent className="py-4">
        <p className="mb-2 text-sm font-medium">Import Data</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Restore from a JSON backup file
        </p>
        <Button variant="secondary" onClick={() => inputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Import Backup
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </CardContent>
    </Card>
  )
}

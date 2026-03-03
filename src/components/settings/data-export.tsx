import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import { STORAGE_KEYS, getStorageItem } from "@/lib/storage"
import { DEFAULT_PLAN } from "@/lib/default-plan"
import type { AppData } from "@/types"
import { toast } from "sonner"

export function DataExport() {
  function handleExport() {
    const data: AppData = {
      version: 1,
      workoutSchedule: getStorageItem(STORAGE_KEYS.WORKOUT_SCHEDULE, DEFAULT_PLAN),
      workoutLogs: getStorageItem(STORAGE_KEYS.WORKOUT_LOGS, []),
      activeWorkout: getStorageItem(STORAGE_KEYS.ACTIVE_WORKOUT, null),
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `fitness-tracker-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Backup exported")
  }

  return (
    <Card>
      <CardContent className="py-4">
        <p className="mb-2 text-sm font-medium">Export Data</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Download a JSON backup of all your data
        </p>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Backup
        </Button>
      </CardContent>
    </Card>
  )
}

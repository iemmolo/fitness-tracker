import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Footprints } from "lucide-react"

interface WalkTrackerProps {
  completed: boolean
  onToggle: () => void
}

export function WalkTracker({ completed, onToggle }: WalkTrackerProps) {
  return (
    <Card>
      <CardContent className="py-4">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full min-h-[44px] items-center gap-3"
        >
          <Checkbox checked={completed} aria-hidden="true" tabIndex={-1} />
          <Footprints className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">
            Did you walk today?{" "}
            <span className="text-muted-foreground font-normal">(2.4 km)</span>
          </span>
        </button>
      </CardContent>
    </Card>
  )
}

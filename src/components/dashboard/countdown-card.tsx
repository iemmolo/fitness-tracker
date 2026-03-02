import { Card, CardContent } from "@/components/ui/card"
import { getDaysUntilTarget, getTargetDateFormatted } from "@/lib/date-utils"

export function CountdownCard() {
  const days = getDaysUntilTarget()

  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm text-muted-foreground">Days until</p>
          <p className="text-sm font-medium">{getTargetDateFormatted()}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold tabular-nums">{days}</p>
          <p className="text-xs text-muted-foreground">days left</p>
        </div>
      </CardContent>
    </Card>
  )
}

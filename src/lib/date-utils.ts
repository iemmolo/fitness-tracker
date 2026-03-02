import {
  format,
  differenceInDays,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
  getDay,
} from "date-fns"
import type { DayOfWeek } from "@/types"

const TARGET_DATE = new Date(2026, 6, 31) // July 31st 2026

const DAY_INDEX_TO_NAME: Record<number, DayOfWeek> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
}

export function getDaysUntilTarget(): number {
  return Math.max(0, differenceInDays(TARGET_DATE, new Date()))
}

export function getTargetDateFormatted(): string {
  return format(TARGET_DATE, "MMMM d, yyyy")
}

export function getTodayDayOfWeek(): DayOfWeek {
  return DAY_INDEX_TO_NAME[getDay(new Date())]
}

export function getTodayISO(): string {
  return format(new Date(), "yyyy-MM-dd")
}

export function formatDate(iso: string): string {
  return format(parseISO(iso), "EEE, MMM d")
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), "h:mm a")
}

export function getCurrentWeekBounds(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: startOfWeek(now, { weekStartsOn: 1 }), // Monday
    end: endOfWeek(now, { weekStartsOn: 1 }),       // Sunday
  }
}

export function isDateInCurrentWeek(dateStr: string): boolean {
  const { start, end } = getCurrentWeekBounds()
  return isWithinInterval(parseISO(dateStr), { start, end })
}

export function getNextScheduledDay(
  schedule: Partial<Record<DayOfWeek, string>>
): { day: DayOfWeek; isToday: boolean } | null {
  const days: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const todayIndex = days.indexOf(getTodayDayOfWeek())

  // Check today first
  if (schedule[days[todayIndex]]) {
    return { day: days[todayIndex], isToday: true }
  }

  // Check upcoming days this week, then wrap around
  for (let i = 1; i < 7; i++) {
    const idx = (todayIndex + i) % 7
    if (schedule[days[idx]]) {
      return { day: days[idx], isToday: false }
    }
  }

  return null
}

export function dayOfWeekLabel(day: DayOfWeek): string {
  return day.charAt(0).toUpperCase() + day.slice(1)
}

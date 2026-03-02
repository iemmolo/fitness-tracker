import type { WorkoutSchedule } from "@/types"

export const DEFAULT_PLAN: WorkoutSchedule = {
  schedule: {
    monday: "full-body-a",
    wednesday: "full-body-b",
    friday: "full-body-c",
  },
  templates: [
    {
      id: "full-body-a",
      name: "Full Body A — Strength",
      exercises: [
        { id: "barbell-squat", name: "Barbell Squat", sets: 4, reps: 6, weightKg: 60 },
        { id: "bench-press", name: "Bench Press", sets: 4, reps: 8, weightKg: 50 },
        { id: "cable-row", name: "Cable Row", sets: 3, reps: 10, weightKg: 40 },
        { id: "lateral-raise", name: "Lateral Raise", sets: 3, reps: 15, weightKg: 5, notes: "Light — shoulder rehab" },
        { id: "db-bicep-curl", name: "DB Bicep Curl", sets: 3, reps: 12, weightKg: 10 },
        { id: "plank", name: "Plank", sets: 3, reps: 45, weightKg: 0, notes: "45 seconds hold" },
      ],
    },
    {
      id: "full-body-b",
      name: "Full Body B — Posterior Chain",
      exercises: [
        { id: "rdl", name: "Romanian Deadlift", sets: 4, reps: 8, weightKg: 50 },
        { id: "incline-db-press", name: "Incline DB Press", sets: 3, reps: 10, weightKg: 16 },
        { id: "lat-pulldown", name: "Lat Pulldown", sets: 3, reps: 10, weightKg: 45 },
        { id: "leg-curl", name: "Leg Curl", sets: 3, reps: 12, weightKg: 30 },
        { id: "face-pull", name: "Face Pull", sets: 3, reps: 15, weightKg: 10, notes: "Shoulder rehab" },
        { id: "tricep-pushdown", name: "Tricep Pushdown", sets: 3, reps: 12, weightKg: 20 },
      ],
    },
    {
      id: "full-body-c",
      name: "Full Body C — Machine / Recovery",
      exercises: [
        { id: "leg-press", name: "Leg Press", sets: 4, reps: 10, weightKg: 100 },
        { id: "machine-chest-press", name: "Machine Chest Press", sets: 3, reps: 10, weightKg: 40 },
        { id: "barbell-row", name: "Barbell Row", sets: 4, reps: 8, weightKg: 50 },
        { id: "leg-extension", name: "Leg Extension", sets: 3, reps: 12, weightKg: 35 },
        { id: "cable-bicep-curl", name: "Cable Bicep Curl", sets: 3, reps: 12, weightKg: 15 },
        { id: "hammer-curl", name: "Hammer Curl", sets: 3, reps: 12, weightKg: 10 },
      ],
    },
  ],
}

import { createHashRouter, RouterProvider } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import { Toaster } from "@/components/ui/sonner"
import DashboardPage from "@/pages/dashboard"
import ActiveWorkoutPage from "@/pages/active-workout"
import HistoryPage from "@/pages/history"
import AnalyticsPage from "@/pages/analytics"
import SettingsPage from "@/pages/settings"

const router = createHashRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "workout", element: <ActiveWorkoutPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

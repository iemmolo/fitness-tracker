import { Outlet } from "react-router-dom"
import { BottomNav } from "./bottom-nav"

export function AppShell() {
  return (
    <div className="min-h-dvh bg-background">
      <main className="mx-auto max-w-lg px-4 pb-24 pt-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

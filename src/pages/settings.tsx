import { DataExport } from "@/components/settings/data-export"
import { DataImport } from "@/components/settings/data-import"

export default function SettingsPage() {
  function handleImported() {
    // Force re-render by reloading the page to pick up new localStorage data
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Settings</h1>
      <DataExport />
      <DataImport onImported={handleImported} />
    </div>
  )
}

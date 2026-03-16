import { getSiteConfig, upsertSiteConfig } from "@/lib/actions/site-config"
import { SettingsForm } from "./settings-form"

export default async function SettingsPage() {
  const config = await getSiteConfig()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Impostazioni Sito</h1>
      <SettingsForm defaultValues={config ?? undefined} />
    </div>
  )
}

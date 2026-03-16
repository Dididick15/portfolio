import { getPassions } from "@/lib/actions/passions"
import { PassionsList } from "./passions-list"

export default async function PassionsPage() {
  const passions = await getPassions()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Passioni</h1>
        <a
          href="/admin/passions/new"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
        >
          + Nuova
        </a>
      </div>
      <PassionsList passions={passions} />
    </div>
  )
}

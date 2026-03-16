import { prisma } from "@/lib/prisma"
import { Heart, FolderOpen, Settings } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const [passions, projects] = await Promise.all([
    prisma.passion.count(),
    prisma.project.count(),
  ])

  const stats = [
    { label: "Passioni", value: passions, icon: Heart, href: "/admin/passions" },
    { label: "Progetti", value: projects, icon: FolderOpen, href: "/admin/projects" },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Icon size={20} className="text-white/40 mb-3" />
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-white/50 mt-1">{label}</div>
          </Link>
        ))}
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-white/40 uppercase tracking-wider">Azioni rapide</h2>
        <div className="flex gap-3">
          <Link href="/admin/passions/new" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors">
            + Nuova passione
          </Link>
          <Link href="/admin/projects/new" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors">
            + Nuovo progetto
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors flex items-center gap-2">
            <Settings size={14} /> Impostazioni
          </Link>
        </div>
      </div>
    </div>
  )
}

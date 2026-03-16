"use client"

import { deletePassion } from "./actions"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"

type Passion = {
  id: string; name: string; emoji: string; color: string
  isVisible: boolean; _count: { projects: number }
}

export function PassionsList({ passions }: { passions: Passion[] }) {
  if (!passions.length) {
    return <p className="text-white/40 text-sm">Nessuna passione ancora. Crea la prima!</p>
  }

  return (
    <div className="space-y-2">
      {passions.map((p) => (
        <div
          key={p.id}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">{p.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{p.name}</span>
                <span className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                {!p.isVisible && <span className="text-xs text-white/30">nascosta</span>}
              </div>
              <span className="text-xs text-white/40">{p._count.projects} progetti</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/passions/${p.id}/edit`}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Pencil size={14} className="text-white/50" />
            </Link>
            <form action={deletePassion.bind(null, p.id)}>
              <button
                type="submit"
                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                onClick={(e) => { if (!confirm("Eliminare questa passione e tutti i suoi progetti?")) e.preventDefault() }}
              >
                <Trash2 size={14} className="text-red-400/70" />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}

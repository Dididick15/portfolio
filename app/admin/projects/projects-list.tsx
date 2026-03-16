"use client"

import { deleteProject } from "./actions"
import Link from "next/link"
import { Pencil, Trash2, Star } from "lucide-react"

type Project = {
  id: string; title: string; isFeatured: boolean; isVisible: boolean
  passion: { name: string; color: string }
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return <p className="text-white/40 text-sm">Nessun progetto ancora.</p>
  }

  return (
    <div className="space-y-2">
      {projects.map((p) => (
        <div
          key={p.id}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.passion.color }} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{p.title}</span>
                {p.isFeatured && <Star size={12} className="text-yellow-400" />}
                {!p.isVisible && <span className="text-xs text-white/30">nascosto</span>}
              </div>
              <span className="text-xs text-white/40">{p.passion.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/projects/${p.id}/edit`}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Pencil size={14} className="text-white/50" />
            </Link>
            <form action={deleteProject.bind(null, p.id)}>
              <button
                type="submit"
                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                onClick={(e) => { if (!confirm("Eliminare questo progetto?")) e.preventDefault() }}
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

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Heart, FolderOpen, Settings, LogOut } from "lucide-react"
import { signOut } from "@/app/admin/login/actions"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/passions", label: "Passioni", icon: Heart },
  { href: "/admin/projects", label: "Progetti", icon: FolderOpen },
  { href: "/admin/settings", label: "Impostazioni", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 min-h-screen bg-white/5 border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <span className="text-white font-bold text-sm">Admin Panel</span>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3">
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors w-full"
          >
            <LogOut size={16} />
            Esci
          </button>
        </form>
      </div>
    </aside>
  )
}

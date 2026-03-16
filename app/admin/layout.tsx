import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050510] flex">
      <Sidebar />
      <main className="flex-1 p-8 text-white overflow-auto">
        {children}
      </main>
    </div>
  )
}

import { getProjects } from "@/lib/actions/projects"
import { ProjectsList } from "./projects-list"

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Progetti</h1>
        <a
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
        >
          + Nuovo
        </a>
      </div>
      <ProjectsList projects={projects} />
    </div>
  )
}

import { ProjectForm } from "@/components/admin/project-form"
import { getProjectById, updateProject } from "@/lib/actions/projects"
import { getPassions } from "@/lib/actions/passions"
import { redirect, notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [project, passions] = await Promise.all([getProjectById(id), getPassions()])
  if (!project) notFound()

  async function action(_: unknown, formData: FormData) {
    "use server"
    try {
      await updateProject(id, {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        passionId: formData.get("passionId") as string,
        longDesc: (formData.get("longDesc") as string) || undefined,
        coverImage: (formData.get("coverImage") as string) || null,
        externalUrl: (formData.get("externalUrl") as string) || null,
        tags: ((formData.get("tags") as string) || "").split(",").map(t => t.trim()).filter(Boolean),
        isFeatured: formData.get("isFeatured") === "on",
        isVisible: formData.get("isVisible") === "on",
      })
    } catch (e) {
      return { error: (e as Error).message }
    }
    redirect("/admin/projects")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Modifica — {project.title}</h1>
      <ProjectForm action={action} passions={passions} defaultValues={{
        ...project,
        longDesc: project.longDesc ?? undefined,
        coverImage: project.coverImage ?? undefined,
        externalUrl: project.externalUrl ?? undefined,
      }} />
    </div>
  )
}

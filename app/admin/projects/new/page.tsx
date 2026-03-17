import { ProjectForm } from "@/components/admin/project-form"
import { createProject } from "@/lib/actions/projects"
import { getPassions } from "@/lib/actions/passions"
import { redirect } from "next/navigation"

async function action(_: unknown, formData: FormData) {
  "use server"
  try {
    await createProject({
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      passionId: formData.get("passionId") as string,
      longDesc: (formData.get("longDesc") as string) || undefined,
      coverImage: (formData.get("coverImage") as string) || undefined,
      images: formData.getAll("images").filter(Boolean) as string[],
      externalUrl: (formData.get("externalUrl") as string) || undefined,
      tags: ((formData.get("tags") as string) || "").split(",").map(t => t.trim()).filter(Boolean),
      isFeatured: formData.get("isFeatured") === "on",
    })
  } catch (e) {
    return { error: (e as Error).message }
  }
  redirect("/admin/projects")
}

export default async function NewProjectPage() {
  const passions = await getPassions()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Nuovo Progetto</h1>
      <ProjectForm action={action} passions={passions} />
    </div>
  )
}

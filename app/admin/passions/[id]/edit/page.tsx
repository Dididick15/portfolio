import { PassionForm } from "@/components/admin/passion-form"
import { getPassionById, updatePassion } from "@/lib/actions/passions"
import { redirect, notFound } from "next/navigation"

export default async function EditPassionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const passion = await getPassionById(id)
  if (!passion) notFound()

  async function action(_: unknown, formData: FormData) {
    "use server"
    try {
      await updatePassion(id, {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        emoji: formData.get("emoji") as string,
        color: formData.get("color") as string,
        modelUrl: (formData.get("modelUrl") as string) || null,
        positionX: parseFloat(formData.get("positionX") as string) || 0,
        positionY: parseFloat(formData.get("positionY") as string) || 0,
        positionZ: parseFloat(formData.get("positionZ") as string) || 0,
        positionMX: parseFloat(formData.get("positionMX") as string) || 0,
        positionMY: parseFloat(formData.get("positionMY") as string) || 0,
        positionMZ: parseFloat(formData.get("positionMZ") as string) || 0,
        isVisible: formData.get("isVisible") === "on",
        useModelColor: formData.get("useModelColor") === "on",
      })
    } catch (e) {
      return { error: (e as Error).message }
    }
    redirect("/admin/passions")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Modifica — {passion.name}</h1>
      <PassionForm action={action} defaultValues={{ ...passion, emoji: passion.emoji ?? undefined, modelUrl: passion.modelUrl ?? undefined }} />
    </div>
  )
}

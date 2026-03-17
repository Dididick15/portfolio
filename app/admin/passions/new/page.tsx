import { PassionForm } from "@/components/admin/passion-form"
import { createPassion } from "@/lib/actions/passions"
import { redirect } from "next/navigation"

async function action(_: unknown, formData: FormData) {
  "use server"
  try {
    await createPassion({
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      emoji: formData.get("emoji") as string,
      color: formData.get("color") as string,
      modelUrl: (formData.get("modelUrl") as string) || undefined,
      positionX: parseFloat(formData.get("positionX") as string) || 0,
      positionY: parseFloat(formData.get("positionY") as string) || 0,
      positionZ: parseFloat(formData.get("positionZ") as string) || 0,
      positionMX: parseFloat(formData.get("positionMX") as string) || 0,
      positionMY: parseFloat(formData.get("positionMY") as string) || 0,
      positionMZ: parseFloat(formData.get("positionMZ") as string) || 0,
      useModelColor: formData.get("useModelColor") === "on",
    })
  } catch (e) {
    return { error: (e as Error).message }
  }
  redirect("/admin/passions")
}

export default function NewPassionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Nuova Passione</h1>
      <PassionForm action={action} />
    </div>
  )
}

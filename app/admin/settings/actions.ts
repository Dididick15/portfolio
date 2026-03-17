"use server"

import { upsertSiteConfig } from "@/lib/actions/site-config"

export async function updateSettings(_: unknown, formData: FormData) {
  try {
    await upsertSiteConfig({
      ownerName: formData.get("ownerName") as string,
      title: (formData.get("title") as string) || undefined,
      bio: (formData.get("bio") as string) || null,
      avatarUrl: (formData.get("avatarUrl") as string) || null,
      bioLong: (formData.get("bioLong") as string) || null,
      location: (formData.get("location") as string) || null,
      availableForWork: formData.get("availableForWork") === "on",
      cvUrl: (formData.get("cvUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      linkedinUrl: (formData.get("linkedinUrl") as string) || null,
      instagramUrl: (formData.get("instagramUrl") as string) || null,
      emailContact: (formData.get("emailContact") as string) || null,
    })
    return { success: true }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

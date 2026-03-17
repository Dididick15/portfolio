"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSiteConfig() {
  try {
    return await prisma.siteConfig.findUnique({ where: { id: "main" } })
  } catch {
    return null
  }
}

export async function upsertSiteConfig(data: {
  ownerName: string; title?: string; bio?: string | null
  avatarUrl?: string | null; bioLong?: string | null
  location?: string | null; availableForWork?: boolean
  cvUrl?: string | null; githubUrl?: string | null
  linkedinUrl?: string | null; instagramUrl?: string | null
  emailContact?: string | null; tags?: string[]
}) {
  await prisma.siteConfig.upsert({
    where: { id: "main" },
    create: { id: "main", ...data },
    update: data,
  })
  revalidatePath("/admin/settings")
  revalidatePath("/")
}

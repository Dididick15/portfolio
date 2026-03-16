"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSiteConfig() {
  return prisma.siteConfig.findUnique({ where: { id: "main" } })
}

export async function upsertSiteConfig(data: {
  ownerName: string; title?: string; bio?: string | null
  avatarUrl?: string | null; githubUrl?: string | null
  linkedinUrl?: string | null; instagramUrl?: string | null
  emailContact?: string | null
}) {
  await prisma.siteConfig.upsert({
    where: { id: "main" },
    create: { id: "main", ...data },
    update: data,
  })
  revalidatePath("/admin/settings")
  revalidatePath("/")
}

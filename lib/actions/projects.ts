"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProjects(passionId?: string, visibleOnly = false) {
  return prisma.project.findMany({
    where: {
      ...(passionId ? { passionId } : {}),
      ...(visibleOnly ? { isVisible: true } : {}),
    },
    orderBy: { sortOrder: "asc" },
    include: { passion: { select: { name: true, color: true } } },
  })
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: { passion: { select: { id: true, name: true, color: true } } },
  })
}

export async function createProject(data: {
  title: string; slug: string; description: string
  passionId: string; longDesc?: string; coverImage?: string
  images?: string[]; externalUrl?: string; tags: string[]; isFeatured?: boolean
}) {
  const count = await prisma.project.count({ where: { passionId: data.passionId } })
  await prisma.project.create({ data: { ...data, sortOrder: count } })
  revalidatePath("/admin/projects")
  revalidatePath("/")
}

export async function updateProject(id: string, data: {
  title?: string; description?: string; longDesc?: string
  coverImage?: string | null; images?: string[]; externalUrl?: string | null
  tags?: string[]; isFeatured?: boolean; isVisible?: boolean
  passionId?: string
}) {
  await prisma.project.update({ where: { id }, data })
  revalidatePath("/admin/projects")
  revalidatePath("/")
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath("/admin/projects")
  revalidatePath("/")
}

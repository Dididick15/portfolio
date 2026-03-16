"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getPassions() {
  return prisma.passion.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { projects: true } } },
  })
}

export async function getPassionById(id: string) {
  return prisma.passion.findUnique({ where: { id } })
}

export async function createPassion(data: {
  name: string; slug: string; description: string
  emoji: string; color: string; modelUrl?: string
  positionX: number; positionY: number; positionZ: number
}) {
  const count = await prisma.passion.count()
  await prisma.passion.create({ data: { ...data, sortOrder: count } })
  revalidatePath("/admin/passions")
  revalidatePath("/")
}

export async function updatePassion(id: string, data: {
  name?: string; description?: string; emoji?: string
  color?: string; modelUrl?: string | null
  positionX?: number; positionY?: number; positionZ?: number
  isVisible?: boolean
}) {
  await prisma.passion.update({ where: { id }, data })
  revalidatePath("/admin/passions")
  revalidatePath("/")
}

export async function deletePassion(id: string) {
  await prisma.passion.delete({ where: { id } })
  revalidatePath("/admin/passions")
  revalidatePath("/")
}

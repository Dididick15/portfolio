"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const FALLBACK_PASSIONS = [
  { id: '1', name: 'Fotografia',  slug: 'fotografia',  description: '', emoji: '📷', color: '#E8A87C', modelUrl: null, positionX: -2.2, positionY:  1.5, positionZ: 0, sortOrder: 0, isVisible: true, createdAt: new Date(), updatedAt: new Date(), _count: { projects: 0 } },
  { id: '2', name: 'Videogiochi', slug: 'videogiochi', description: '', emoji: '🎮', color: '#7C5CFC', modelUrl: null, positionX:  2.2, positionY:  1.5, positionZ: 0, sortOrder: 1, isVisible: true, createdAt: new Date(), updatedAt: new Date(), _count: { projects: 0 } },
  { id: '3', name: 'Cucina',      slug: 'cucina',      description: '', emoji: '🍳', color: '#2ED573', modelUrl: null, positionX: -2.2, positionY: -1.5, positionZ: 0, sortOrder: 2, isVisible: true, createdAt: new Date(), updatedAt: new Date(), _count: { projects: 0 } },
  { id: '4', name: 'Grafica',     slug: 'grafica',     description: '', emoji: '🎨', color: '#FF6B6B', modelUrl: null, positionX:  2.2, positionY: -1.5, positionZ: 0, sortOrder: 3, isVisible: true, createdAt: new Date(), updatedAt: new Date(), _count: { projects: 0 } },
]

export async function getPassions() {
  try {
    return await prisma.passion.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { projects: true } } },
    })
  } catch {
    return FALLBACK_PASSIONS
  }
}

export async function getPassionById(id: string) {
  return prisma.passion.findUnique({ where: { id } })
}

export async function createPassion(data: {
  name: string; slug: string; description: string
  emoji?: string; color: string; modelUrl?: string
  positionX: number; positionY: number; positionZ: number
  useModelColor?: boolean
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
  isVisible?: boolean; useModelColor?: boolean
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

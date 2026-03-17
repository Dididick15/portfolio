import { notFound } from 'next/navigation'
import { getProjectById } from '@/lib/actions/projects'
import { MobileProjectDetail } from '@/components/mobile/MobileProjectDetail'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = await getProjectById(id)
  return { title: project?.title ?? 'Progetto' }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const raw = await getProjectById(id)
  if (!raw) notFound()

  // passion.color is selected in getProjectById but not yet in generated Prisma types
  const passion = raw.passion as { id: string; name: string; color: string }

  return (
    <MobileProjectDetail
      project={{ ...raw, passion }}
    />
  )
}

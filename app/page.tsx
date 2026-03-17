import { getSiteConfig } from '@/lib/actions/site-config'
import { getPassions } from '@/lib/actions/passions'
import { getProjects } from '@/lib/actions/projects'
import HomeClient from './HomeClient'

export default async function Home() {
  const [config, passions, projects] = await Promise.all([getSiteConfig(), getPassions(), getProjects(undefined, true)])
  return (
    <HomeClient
      avatarUrl={config?.avatarUrl ?? null}
      passions={passions}
      siteConfig={config}
      projects={projects}
    />
  )
}

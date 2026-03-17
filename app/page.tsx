import { getSiteConfig } from '@/lib/actions/site-config'
import { getPassions } from '@/lib/actions/passions'
import HomeClient from './HomeClient'

export default async function Home() {
  const [config, passions] = await Promise.all([getSiteConfig(), getPassions()])
  return (
    <HomeClient
      avatarUrl={config?.avatarUrl ?? null}
      passions={passions}
      siteConfig={config}
    />
  )
}

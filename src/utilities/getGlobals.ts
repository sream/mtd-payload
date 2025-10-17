import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Config } from 'src/payload-types'

type Global = keyof Config['globals']

async function getGlobal<S extends Global>(slug: S, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global as Config['globals'][S]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export function getCachedGlobal<S extends Global>(slug: S, depth = 0) {
  return unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  }) as () => Promise<Config['globals'][S]>
}

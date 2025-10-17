import { RenderBlocks } from '@/blocks/RenderBlocks'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'
import configPromise from '@payload-config'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  const { blocks } = page

  return <RenderBlocks blocks={blocks} />
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

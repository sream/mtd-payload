import { slugField, type CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { HeroCallout } from '@/blocks/HeroCallout/config'
import { QuoteHighlight } from '@/blocks/QuoteHighlight/config'
import { HotlineCallout } from '@/blocks/HotlineCallout/config'
import { ServicesGrid } from '@/blocks/ServicesGrid/config'
import { FaqAccordion } from '@/blocks/FaqAccordion/config'
import { ContactMap } from '@/blocks/ContactMap/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [
                HeroCallout,
                HotlineCallout,
                ServicesGrid,
                QuoteHighlight,
                FaqAccordion,
                ContactMap,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}

import type { Block } from 'payload'
import { link } from '@/fields/link'
import { stackOrder } from '@/fields/stackingOrder'
import { blockGroups } from '@/config/block-groups'

export const HeroCallout: Block = {
  slug: 'heroCallout',
  interfaceName: 'HeroCallout',
  labels: {
    singular: 'Hero (Callout)',
    plural: 'Hero (Callouts)',
  },
  admin: {
    group: blockGroups.landing,
    disableBlockName: true,
  },
  fields: [
    stackOrder,
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'leadText',
      type: 'textarea',
      required: true,
    },
    link({ name: 'consultationLink', label: 'Consultation Link' }),
  ],
}

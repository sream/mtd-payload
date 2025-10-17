import { Block } from 'payload'
import { stackOrder } from '@/fields/stackingOrder'
import { link } from '@/fields/link'
import { blockGroups } from '@/config/block-groups'

export const HotlineCallout: Block = {
  slug: 'hotlineCallout',
  interfaceName: 'HotlineCallout',
  labels: {
    singular: 'Hotline (Callout)',
    plural: 'Hotline (Callouts)',
  },
  admin: {
    group: blockGroups.landing,
    disableBlockName: true,
  },
  fields: [
    stackOrder,
    {
      name: 'availabilityText',
      type: 'text',
      required: true,
    },
    link({ name: 'phoneLink', label: 'Phone Link' }),
  ],
}

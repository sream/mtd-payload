import { Block } from 'payload'
import { blockGroups } from '@/config/block-groups'

export const ContactMap: Block = {
  slug: 'contactMap',
  interfaceName: 'ContactMap',
  labels: {
    singular: 'Contact (Map)',
    plural: 'Contact (Maps)',
  },
  admin: {
    group: blockGroups.landing,
    disableBlockName: true,
  },
  fields: [
    {
      name: 'location',
      type: 'point',
      required: true,
    },
  ],
}

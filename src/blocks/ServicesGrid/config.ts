import { Block } from 'payload'
import { stackOrder } from '@/fields/stackingOrder'
import { blockGroups } from '@/config/block-groups'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGrid',
  labels: {
    singular: 'Services (Grid)',
    plural: 'Services (Grids)',
  },
  admin: {
    group: blockGroups.landing,
    disableBlockName: true,
  },
  fields: [
    stackOrder,
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'introText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

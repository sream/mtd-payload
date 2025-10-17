import { Block } from 'payload'
import { stackOrder } from '@/fields/stackingOrder'
import { blockGroups } from '@/config/block-groups'

export const QuoteHighlight: Block = {
  slug: 'quoteHighlight',
  interfaceName: 'QuoteHighlight',
  labels: {
    singular: 'Quote (Highlight)',
    plural: 'Quote (Highlights)',
  },
  admin: {
    group: blockGroups.landing,
    disableBlockName: true,
  },
  fields: [
    stackOrder,
    {
      name: 'quote',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
  ],
}

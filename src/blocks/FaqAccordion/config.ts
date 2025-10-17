import { Block } from 'payload'
import { blockGroups } from '@/config/block-groups'
import { stackOrder } from '@/fields/stackingOrder'
import { link } from '../../fields/link'

export const FaqAccordion: Block = {
  slug: 'faqAccordion',
  interfaceName: 'FaqAccordion',
  labels: {
    singular: 'FAQ (Accordion)',
    plural: 'FAQ (Accordions)',
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
      type: 'text',
      required: true,
    },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      label: 'FAQs',
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'textarea',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'showMoreText',
      type: 'text',
      required: true,
    },
    link({
      name: 'missingQuestionLink',
      label: 'Missing Question Link',
    }),
  ],
}

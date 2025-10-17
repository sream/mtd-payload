import { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'company',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'contactInfo',
          type: 'array',
          required: true,
          labels: {
            singular: 'Contact Item',
            plural: 'Contact Items',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            link({ label: 'Contact Link' }),
          ],
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      required: true,
      fields: [
        { name: 'platform', type: 'select', required: true, options: ['facebook', 'instagram'] },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'menu',
      type: 'array',
      required: true,
      labels: {
        singular: 'Menu Item',
        plural: 'Menu Items',
      },
      fields: [link()],
      admin: {
        components: {
          RowLabel: '@/globals/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

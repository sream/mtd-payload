import { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contactLink',
      type: 'group',
      fields: [link()],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

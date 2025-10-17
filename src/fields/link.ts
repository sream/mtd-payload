import { Field, GroupField, LabelFunction, StaticLabel } from 'payload'

type LinkType = (options?: { name?: string; label?: false | LabelFunction | StaticLabel }) => Field

export const link: LinkType = ({ name = 'link', label = false } = {}) => {
  const linkResult: GroupField = {
    name,
    type: 'group',
    label,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'custom',
            options: [
              {
                label: 'Custom URL',
                value: 'custom',
              },
              {
                label: 'Internal link',
                value: 'reference',
              },
            ],
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  linkResult.fields.push({
    type: 'row',
    fields: [
      ...linkTypes,
      {
        name: 'label',
        type: 'text',
        admin: {
          width: '50%',
        },
        label: 'Label',
        required: true,
      },
    ],
  })

  return linkResult
}

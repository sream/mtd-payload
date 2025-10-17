'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['menu']>[number]>()

  const label = data?.data?.link?.label
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}. ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}

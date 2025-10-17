import Link from 'next/link'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Page } from '@/payload-types'

type LinkField = {
  type?: 'custom' | 'reference' | null
  className?: string
  children?: React.ReactNode
  disableLabel?: boolean
  label?: string | null
  reference?: {
    relationTo: 'pages'
    value: Page | string | number
  } | null
  url?: string | null
}

type ResolveLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'type'> &
  LinkField & {
    children?: React.ReactNode
  }

export const ResolveLink: React.FC<ResolveLinkProps> = (props) => {
  const { type, className, children, label, disableLabel = false, reference, url, onClick } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  return (
    <Link className={cn(className)} href={href || url || ''} onClick={onClick}>
      {!disableLabel && label}
      {children}
    </Link>
  )
}

'use client'

import type { ContactMap } from '@/payload-types'

interface ContactMapClientProps {
  location: ContactMap['location']
}

export const ContactMapClient = ({ location }: ContactMapClientProps) => {
  const [lng, lat] = location

  return (
    <div className="relative h-150 w-150 rounded-full shadow-lg">
      <div className="absolute inset-0 overflow-hidden [clip-path:circle(50%_at_50%_50%)]"></div>
    </div>
  )
}

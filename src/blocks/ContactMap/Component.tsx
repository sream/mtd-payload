import React from 'react'

import type { ContactMap as ContactMapProps } from '@/payload-types'
import { ContactMapClient } from './ContactMap.client'

export const ContactMap: React.FC<ContactMapProps> = ({ location }) => {
  return (
    <>
      <ContactMapClient location={location} />
    </>
  )
}

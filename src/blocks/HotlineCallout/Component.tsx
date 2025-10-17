import React from 'react'

import type { HotlineCallout as HotlineCalloutProps } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { TextWithBreaks } from '@/components/ui/text-with-breaks'
import { ResolveLink } from '@/components/Link'

export const HotlineCallout: React.FC<HotlineCalloutProps> = ({
  zIndex,
  availabilityText,
  phoneLink,
}) => {
  return (
    <section className="bg-brand shadow-block block-offset rounded-b" style={{ zIndex }}>
      <div className="block-container py-9 lg:py-15">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <div className="lg:col-span-8 lg:col-start-3">
            <div className="flex items-center justify-between gap-x-4 lg:gap-x-5">
              <p className="text-base/snug text-white uppercase">
                <TextWithBreaks text={availabilityText} />
              </p>
              <Button variant="inverse" asChild>
                <ResolveLink {...phoneLink} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

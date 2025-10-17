import React from 'react'

import type { HeroCallout as HeroCalloutProps } from '@/payload-types'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TextWithBreaks } from '@/components/ui/text-with-breaks'
import { ResolveLink } from '@/components/Link'

export const HeroCallout: React.FC<HeroCalloutProps> = ({
  zIndex,
  coverImage,
  headline,
  leadText,
  consultationLink,
}) => {
  return (
    <section className="bg-brand-light shadow-block relative rounded-b" style={{ zIndex }}>
      <div className="block-container">
        <div className="flex flex-col items-end lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="-mx-4 lg:mr-0 lg:-ml-8 2xl:-ml-22.5">
              <div className="relative h-71.5 lg:h-180">
                {coverImage && typeof coverImage === 'object' && (
                  <Image
                    className="rounded-b object-cover lg:rounded-none"
                    src={coverImage.url || ''}
                    fill
                    alt={coverImage.alt}
                    fetchPriority="high"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full py-7 lg:w-1/2 lg:pb-22.5">
            <div className="lg:ml-2.5 lg:grid lg:grid-cols-6 lg:gap-x-5">
              <div className="lg:col-span-5 lg:col-start-2">
                <h1 className="font-open-runde text-brand mb-2.5 text-4xl/9.5 tracking-[-0.03em] lg:mb-3 lg:text-5xl">
                  <TextWithBreaks text={headline} />
                </h1>
                <p className="text-base/snug">{leadText}</p>
                <Button asChild>
                  <ResolveLink className="mt-4.5 lg:mt-6" {...consultationLink} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

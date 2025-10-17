import React from 'react'

import type { FaqAccordion as FaqAccordionProps } from '@/payload-types'
import { FaqAccordionClient } from './FaqAccordion.client'

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  heading,
  introText,
  faqs,
  showMoreText,
  missingQuestionLink,
}) => {
  return (
    <section className="bg-brown-100">
      <div className="block-container py-28">
        <div>
          <div className="flex justify-center">
            <div className="text-center">
              <h2 className="text-brand">{heading}</h2>
              <p className="text-brown-300 uppercase">{introText}</p>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-3 lg:gap-x-5">
              <FaqAccordionClient
                faqs={faqs}
                showMoreText={showMoreText}
                missingQuestionLink={missingQuestionLink}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

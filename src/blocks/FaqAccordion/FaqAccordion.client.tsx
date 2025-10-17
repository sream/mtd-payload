'use client'

import React, { useState } from 'react'

import type { FaqAccordion } from '@/payload-types'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/utilities/ui'
import { ResolveLink } from '../../components/Link'

interface FaqAccordionClientProps {
  faqs: FaqAccordion['faqs']
  showMoreText: FaqAccordion['showMoreText']
  missingQuestionLink: FaqAccordion['missingQuestionLink']
}

export const FaqAccordionClient = ({
  faqs,
  showMoreText,
  missingQuestionLink,
}: FaqAccordionClientProps) => {
  const [expanded, setExpanded] = useState(false)
  const visibleCount = 6

  return (
    <div>
      <Accordion type="single" collapsible>
        {faqs.map(({ question, answer }, index) => {
          const isHiddenOnMobile = !expanded && index >= visibleCount
          return (
            <div key={index} className={cn(isHiddenOnMobile && 'hidden lg:block')}>
              <AccordionItem value={index.toString()}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            </div>
          )
        })}
      </Accordion>

      {!expanded && faqs.length > visibleCount && (
        <div className="mt-4 text-center lg:hidden">
          <button
            type="button"
            className="text-brand underline underline-offset-4"
            onClick={() => setExpanded(true)}
          >
            {showMoreText}
          </button>
        </div>
      )}

      <div className={cn('mt-4 text-center', expanded ? 'block' : 'hidden lg:block')}>
        <ResolveLink disableLabel={true} {...missingQuestionLink}>
          <span className="uppercase">{missingQuestionLink.label}</span>
        </ResolveLink>
      </div>
    </div>
  )
}

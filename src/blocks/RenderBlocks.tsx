import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { HeroCallout } from '@/blocks/HeroCallout/Component'
import { QuoteHighlight } from '@/blocks/QuoteHighlight/Component'
import { HotlineCallout } from '@/blocks/HotlineCallout/Component'
import { ServicesGrid } from '@/blocks/ServicesGrid/Component'
import { FaqAccordion } from '@/blocks/FaqAccordion/Component'
import { ContactMap } from '@/blocks/ContactMap/Component'

const blockComponents = {
  heroCallout: HeroCallout,
  hotlineCallout: HotlineCallout,
  servicesGrid: ServicesGrid,
  quoteHighlight: QuoteHighlight,
  faqAccordion: FaqAccordion,
  contactMap: ContactMap,
}

export const RenderBlocks: React.FC<{
  blocks: Page['blocks'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index} className="relative">
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

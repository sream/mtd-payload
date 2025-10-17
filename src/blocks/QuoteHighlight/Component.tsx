import type { QuoteHighlight as QuoteHighlightProps } from '@/payload-types'

import { TextWithBreaks } from '@/components/ui/text-with-breaks'

export const QuoteHighlight: React.FC<QuoteHighlightProps> = ({ zIndex, quote, author }) => {
  return (
    <section style={{ zIndex }}>
      <div className="block-container">
        <div className="py-15 text-center lg:py-22.5">
          <blockquote>
            <TextWithBreaks text={quote} />
          </blockquote>
          <p className="mt-3 lg:mt-5">{author}</p>
        </div>
      </div>
    </section>
  )
}

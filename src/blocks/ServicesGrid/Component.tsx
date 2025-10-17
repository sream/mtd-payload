'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'

import type { ServicesGrid as ServicesGridProps } from '@/payload-types'

import { TextWithBreaks } from '@/components/ui/text-with-breaks'

/** Exact specs */
const SLIDE_PX = 300 // fixed tile width
const GAP_PX = 16 // visual spacing between tiles
const PEEK_PX = 60 // desired visible portion of the next tile

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  zIndex,
  heading,
  introText,
  services,
}) => {
  const count = services?.length ?? 0
  const [activeIndex, setActiveIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(count > 1)

  const viewportRef = useRef<HTMLDivElement | null>(null)

  // Embla — align left + trim so first/last glue to the left edge
  const [emblaViewportRef, embla] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      loop: false,
      skipSnaps: false,
    },
    [],
  )

  // Attach Embla to our viewport div
  useEffect(() => {
    if (viewportRef.current) emblaViewportRef(viewportRef.current)
  }, [emblaViewportRef])

  // Keep state in sync
  useEffect(() => {
    if (!embla) return
    const update = () => {
      setActiveIndex(embla.selectedScrollSnap())
      setCanPrev(embla.canScrollPrev())
      setCanNext(embla.canScrollNext())
    }
    embla.on('select', update)
    embla.on('reInit', update)
    update()
    return () => {
      embla.off('select', update)
      embla.off('reInit', update)
    }
  }, [embla])

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla])

  // Slide box: width 300, spacing via padding-right (so Embla's snap math stays correct)
  const slideStyle = useMemo<React.CSSProperties>(
    () => ({
      flex: `0 0 ${SLIDE_PX}px`,
      width: `${SLIDE_PX}px`,
      paddingRight: `${GAP_PX}px`,
      boxSizing: 'border-box',
    }),
    [],
  )

  // 🔧 Dynamic viewport right padding:
  // We want to reserve up to GAP + PEEK on the right so the next tile peeks by PEEK,
  // but never so much that the 300px active slide gets clipped.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const ro = new ResizeObserver(([entry]) => {
      const vw = entry.contentRect.width
      // Available spare width if we show one full slide:
      // spare = viewport - slideWidth
      const spare = Math.max(0, vw - SLIDE_PX)

      // We need GAP before the next tile content; then we'd like PEEK of that content visible.
      // Desired paddingRight so that `spare >= GAP + PEEK`.
      const desired = GAP_PX + PEEK_PX

      // But paddingRight reduces available space; effectively we clamp
      // paddingRight to not exceed `spare` and not exceed `desired`.
      const padRight = Math.max(0, Math.min(spare, desired))

      el.style.paddingRight = `${padRight}px`
      // If Embla is ready, ask it to re-measure after layout change
      if (embla) requestAnimationFrame(() => embla.reInit())
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [embla])

  return (
    <section className="bg-brown-100 shadow-block overflow-visible rounded-b" style={{ zIndex }}>
      {/* Header inside the container */}
      <div className="block-container">
        <div className="py-39">
          <div className="mb-6 lg:mb-8">
            <h2>{heading}</h2>
            <p>{introText}</p>
          </div>
        </div>
      </div>

      {/* MOBILE slider outside the container so it can overflow and peek */}
      <div
        className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={typeof heading === 'string' ? heading : 'Services'}
      >
        {/* Viewport: overflow hidden; right padding is set dynamically above */}
        <div ref={viewportRef} className="overflow-hidden">
          {/* Track: NO CSS gap. Spacing is slide padding so Embla's snaps align flush left. */}
          <div className="flex touch-pan-y">
            {services.map(({ title, thumbnail }, i) => (
              <div key={i} className="shrink-0" style={slideStyle}>
                <div className="bg-brand-light relative h-97 w-full rounded uppercase">
                  {thumbnail && typeof thumbnail === 'object' && (
                    <Image
                      className="object-cover"
                      src={thumbnail.url || ''}
                      fill
                      alt={thumbnail.alt}
                      sizes={`${SLIDE_PX}px`}
                      priority={i < 2}
                    />
                  )}
                  <div className="absolute inset-0 rounded bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-end">
                    <div className="pb-10 pl-6">
                      <p className="text-white">
                        <TextWithBreaks text={title} />
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0">
                    <div className="flex justify-end pt-5 pr-5">
                      <Image
                        src="/blocks/services/arrow.svg"
                        alt="Mehr anzeigen"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows under the slider */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Vorheriges Element"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="rounded-2xl border px-3 py-1 text-sm transition-transform active:scale-95 disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Nächstes Element"
            onClick={scrollNext}
            disabled={!canNext}
            className="rounded-2xl border px-3 py-1 text-sm transition-transform active:scale-95 disabled:opacity-40"
          >
            →
          </button>
        </div>

        {/* SR live status */}
        <p className="sr-only" aria-live="polite">
          {activeIndex + 1} von {count}
        </p>
      </div>

      {/* DESKTOP: original 4-col grid */}
      <div className="block-container hidden pb-39 lg:block">
        <div className="grid grid-cols-4 gap-x-5 gap-y-4">
          {services.map(({ title, thumbnail }, index) => (
            <div key={index} className="bg-brand-light relative h-97 rounded uppercase">
              {thumbnail && typeof thumbnail === 'object' && (
                <Image
                  className="object-cover"
                  src={thumbnail.url || ''}
                  fill
                  alt={thumbnail.alt}
                />
              )}
              <div className="absolute inset-0 rounded bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-end">
                <div className="pb-10 pl-6">
                  <p className="text-white">
                    <TextWithBreaks text={title} />
                  </p>
                </div>
              </div>
              <div className="absolute inset-0">
                <div className="flex justify-end pt-5 pr-5">
                  <Image src="/icons/regular/arrow-open.svg" alt="Arrow" width={24} height={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import type { Header } from '@/payload-types'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ResolveLink } from '@/components/Link'

interface MobileNavProps {
  menu: Header['menu']
  contactLink: Header['contactLink']
}

export function MobileNav({ menu, contactLink }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  const toggle = () => {
    if (!open) {
      setOpen(true)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setOpen(true)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const panel: Variants = {
    hidden: { x: '100%', opacity: 0 },
    show: {
      x: '0%',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        when: 'beforeChildren',
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  }

  const content: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: 'easeIn',
      },
    },
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="touch-manipulation outline-none lg:hidden"
          onClick={toggle}
        >
          <div className="relative size-6.5">
            <span
              className={cn(
                'bg-brand absolute left-0 block h-0.5 w-6.5 rounded-full transition-all duration-100',
                open ? 'top-3 -rotate-45' : 'top-1.75',
              )}
            />
            <span
              className={cn(
                'bg-brand absolute left-0 block h-0.5 w-6.5 rounded-full transition-all duration-100',
                open ? 'top-3 rotate-45' : 'top-4.25',
              )}
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent sideOffset={22} className="z-999 bg-transparent">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              variants={panel}
              initial="hidden"
              animate="show"
              exit="exit"
              onAnimationComplete={(def) => {
                if (def === 'exit') setOpen(false)
              }}
            >
              <div className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto bg-white">
                <motion.div variants={content}>
                  <div className="block-container">
                    <div className="flex flex-col">
                      <div className="divide-brown-200 my-15 flex flex-col divide-y">
                        {menu.map(({ link }, i) => (
                          <ResolveLink
                            key={i}
                            className="py-5 pr-8.5 text-right text-xl font-medium uppercase"
                            {...link}
                            onClick={() => setOpen(false)}
                          />
                        ))}
                      </div>
                      <Button className="self-end" asChild>
                        <ResolveLink {...contactLink.link} onClick={() => setOpen(false)} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  )
}

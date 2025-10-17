'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '@/utilities/ui'

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root data-slot="accordion" className="flex flex-col gap-y-1.5" {...props} />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'data-[state=open]:border-brand data-[state=open]:text-brand rounded border px-7.5 py-3 text-base/none data-[state=open]:font-bold',
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'text-left transition-all outline-none [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm data-[state=open]:font-normal"
      {...props}
    >
      <div className={cn('pt-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

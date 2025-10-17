import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'cva'

import { cn } from '@/utilities/ui'

const buttonVariants = cva('rounded inline-flex whitespace-nowrap', {
  variants: {
    variant: {
      outline: 'text-brand border border-2 border-brand',
      solid: '',
      inverse: 'text-white border border-2 border-white',
    },
    size: {
      md: 'text-sm py-1.5 px-4',
    },
    casing: {
      uppercase: 'uppercase',
      normal: 'normal-case',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    casing: 'uppercase',
  },
})

function Button({
  className,
  variant,
  size,
  casing,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, casing, className }))}
      {...props}
    />
  )
}

export { Button }

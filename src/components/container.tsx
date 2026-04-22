import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const containerVariants = tv({
  base: '',
  variants: {
    size: {
      lg: 'max-w-7xl',
      md: 'max-w-5xl',
      sm: 'max-w-2xl'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
})

interface ContainerProps 
  extends React.ComponentProps<'div'>,
  VariantProps<typeof containerVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Container({ as = 'div', className, children, size, ...props }: ContainerProps) {
  return React.createElement(
    as,
    {
      className: containerVariants({size, className}),
      ...props
    },
    children
  )
}
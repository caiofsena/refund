import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

type TextProps = 
  React.ComponentProps<'span'> &
  VariantProps<typeof textVariants> & 
  {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
    htmlFor?: string
  }

export const textVariants = tv({
  base: 'font-sans', 
  variants: {
    variant: {
      'heading-lg-bold': 'text-xl leading-6 font-bold',
      'heading-xl-bold': 'text-2xl leading-6 font-bold',
      'body-md-regular': 'text-sm leading-4 font-normal',
      'body-md-semibold': 'text-sm leading-6 font-semibold',
      'body-md-bold': 'text-sm leading-4 font-bold',
      'body-sm-regular': 'text-xs leading-3.5 font-normal'
    },
    color: {
      primary: 'text-gray-200',
      secondary: 'text-gray-100',
      tertiary: 'text-green-100',
      white: 'text-white'
    }
  },
  defaultVariants: {
    variant: 'body-md-regular',
    color: 'primary'
  }
})

export default function Text({as = 'span', variant, color, className, children, ...props}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({variant, color, className}),
      ...props
    },
    children
  )
}
import { tv, type VariantProps } from "tailwind-variants";
import Container from './container';

const iconWrapperVariants = tv({
  base: 'flex',
  variants: {
    background: {
      empty: '',
      filled: 'p-2 bg-gray-400 rounded-4xl'
    }
  },
  defaultVariants: {
    background: 'empty'
  }
})

export const iconVariants = tv({
  base: 'fill-white',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
    color: {
      primary: 'fill-green-100',
      secondary: 'fill-white'
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'primary'
  },
});

export interface IconProps extends 
  Omit<React.ComponentProps<'svg'>, 'color'>, 
  VariantProps<typeof iconVariants>,
  VariantProps<typeof iconWrapperVariants> {
  svg: React.FC<React.ComponentProps<'svg'>>;
}

export default function Icon({ svg: SvgComponent, size, color, background, className, ...props }: IconProps) {
  return (
    <Container className={iconWrapperVariants({ background })}>
      <SvgComponent className={iconVariants({ size, color, className })} {...props} />
    </Container>
  )
};
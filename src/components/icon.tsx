import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
  base: 'fill-white',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface IconProps extends 
  React.ComponentProps<'svg'>, 
  VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<'svg'>>;
}

export const Icon = ({ svg: SvgComponent, size, className, ...props }: IconProps) => {
  return <SvgComponent className={iconVariants({ size, className })} {...props} />;
};
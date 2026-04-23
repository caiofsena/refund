import { tv, type VariantProps } from 'tailwind-variants';
import Icon, {iconVariants } from './icon';

export const iconButtonVariants = tv({
  base: `
    flex p-2 items-center justify-center bg-green-100 text-white rounded-lg cursor-pointer 
    hover:bg-green-200 transition-colors duration-300
  `,
  variants: {
    size: {
      lg: 'w-12 h-12',
      md: 'w-8 h-8'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
});

export interface IconButtonProps extends 
  Omit<React.ComponentProps<'button'>, 'color'>, 
  VariantProps<typeof iconButtonVariants>,
  Omit<VariantProps<typeof iconVariants>, 'size'> {
  icon: React.ComponentProps<typeof Icon>['svg'];
  iconSize?: React.ComponentProps<typeof Icon>['size'];
}

export default function IconButton(
  { 
    icon,
    iconSize,
    size, 
    className, 
    ...props 
  }: IconButtonProps) {
  return (
    <button className={iconButtonVariants({ size, className })} {...props}>
      <Icon svg={icon} color='secondary' size={iconSize} />
    </button>
  );
}
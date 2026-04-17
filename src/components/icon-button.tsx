import { tv, type VariantProps } from 'tailwind-variants';
import { Icon, iconVariants } from './icon';

export const iconButtonVariants = tv({
  base: `
    p-2 bg-green-100 text-white rounded-lg cursor-pointer 
    hover:bg-green-200 transition-colors duration-300
  `,
});

export interface IconButtonProps extends 
  React.ComponentProps<'button'>, 
  VariantProps<typeof iconButtonVariants>,
  VariantProps<typeof iconVariants> {
  icon?: React.ComponentProps<typeof Icon>['svg'];
}

export const IconButton = (
  { 
    icon, 
    size, 
    className, 
    ...props 
  }: IconButtonProps) => {
  return (
    <button className={iconButtonVariants({ className })} {...props}>
      {icon && 
        <Icon svg={icon} className={iconVariants({ size })} />
      }
    </button>
  );
}
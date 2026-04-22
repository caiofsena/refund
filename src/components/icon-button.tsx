import { tv, type VariantProps } from 'tailwind-variants';
import { Icon, iconVariants } from './icon';

export const iconButtonVariants = tv({
  base: `
    flex w-12 h-12 p-2 items-center justify-center bg-green-100 text-white rounded-lg cursor-pointer 
    hover:bg-green-200 transition-colors duration-300
  `,
});

export interface IconButtonProps extends 
  React.ComponentProps<'button'>, 
  VariantProps<typeof iconButtonVariants>,
  VariantProps<typeof iconVariants> {
  icon: React.ComponentProps<typeof Icon>['svg'];
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
      <Icon svg={icon} className={iconVariants({ size })} />
    </button>
  );
}
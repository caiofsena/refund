import { tv, type VariantProps } from 'tailwind-variants';

export const navLinkVariants = tv({
  base: 'transition-all duration-300',
  variants: {
    state: {
      default: 'text-gray-200',
      hover: 'text-green-100 opacity-50',
      active: 'text-green-100',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export interface NavLinkProps
  extends React.ComponentProps<'a'>,
    VariantProps<typeof navLinkVariants> {}

export const NavLink = ({ state, className, ...props }: NavLinkProps) => {
  return <a className={navLinkVariants({ state, className })} {...props} />;
};
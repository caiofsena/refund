import { Link, type LinkProps } from 'react-router';
import { tv, type VariantProps } from 'tailwind-variants';
import Text from './text';

export const navLinkVariants = tv({
  base: `
    flex h-12 px-5 py-3 items-center justify-center text-gray-200 transition-all duration-300 
    hover:text-green-100 hover:opacity-50
    active:text-green-100
  `,
  variants: {},
  defaultVariants: {},
});

export interface NavLinkProps
  extends LinkProps,
  VariantProps<typeof navLinkVariants> {}

export const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <Link className={navLinkVariants({ className })} {...props}>
      <Text variant='body-md-semibold' color='tertiary'>
        {children}
      </Text>
    </Link>
  )
};
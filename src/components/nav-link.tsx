import { Link, type LinkProps } from 'react-router';
import { tv, type VariantProps } from 'tailwind-variants';

export const navLinkVariants = tv({
  base: `
    text-gray-200 transition-all duration-300
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
      {children}
    </Link>
  )
};
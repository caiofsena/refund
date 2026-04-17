import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: `
    px-5 py-4 bg-green-100 text-white rounded-lg cursor-pointer 
    hover:bg-green-200 transition-colors duration-300
  `,
  variants: {
    size: {
      sm: 'px-4 py-3 text-sm',
      md: 'px-5 py-4 text-base',
      lg: 'px-6 py-5 text-lg',
    },
    disabled: {
      true: 'bg-green-100 cursor-not-allowed opacity-50 hover:bg-green-100',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

export interface ButtonProps extends 
  React.ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
};

export const Button = ({ children, disabled, className, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ disabled, className })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
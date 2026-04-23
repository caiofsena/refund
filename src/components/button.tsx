import { tv, type VariantProps } from 'tailwind-variants';
import Text from './text';

export const buttonVariants = tv({
  base: `
    flex h-12 px-5 py-4 items-center justify-center bg-green-100 text-white rounded-lg cursor-pointer 
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

export default function Button({ children, disabled, className, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ disabled, className })}
      disabled={disabled}
      {...props}
    >
      <Text variant='body-md-bold' color='white'>
        {children}
      </Text>
    </button>
  );
}
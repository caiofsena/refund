import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: `
    px-5 py-4 bg-green-100 text-white rounded-lg cursor-pointer 
    hover:bg-green-200 transition-colors duration-300
  `,
  variants: {
    disabled: {
      true: 'bg-green-100 cursor-not-allowed opacity-50 hover:bg-green-100',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonVariants({ disabled })}
    >
      {children}
    </button>
  );
}
import { tv, type VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
  base: `
    h-12 w-full peer outline-none text-sm text-gray-100 px-4 py-4 rounded-lg border-2 border-gray-300 transition-colors duration-300
    placeholder:text-gray-200
    focus-within:border-green-100 
  `,
  variants: {},
  defaultVariants: {},
});

export const inputLabelVariants = tv({
  base: 'mb-2 text-xs uppercase peer-focus-within:text-green-100 transition-colors duration-300',
});

export interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  label?: string;
}

export default function Input({
  label,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? 'input-id';

  return (
    <div className="flex w-full flex-col-reverse">
      <input
        id={inputId}
        className={inputVariants({ className })}
        {...props} />
      {label && 
        <label htmlFor={inputId} className={inputLabelVariants()}>
          {label}
        </label>
      }
    </div>
  );
};
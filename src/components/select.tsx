import { useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import CaretDown from '../assets/icons/caret-down.svg?react';
import Check from '../assets/icons/check.svg?react';

export const selectLabelVariants = tv({
  base: `
    mb-2 text-xs uppercase transition-colors duration-300
  `,
  variants: {
    open: {
      true: 'text-green-100',
      false: 'text-gray-100',
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const selectTriggerVariants = tv({
  base: `
    w-full h-12 rounded-lg border-2 bg-white px-4 py-4 text-left text-sm
    transition-colors duration-300 outline-none
    flex items-center justify-between
  `,
  variants: {
    open: {
      true: 'border-green-100 text-gray-100',
      false: 'border-gray-300 text-gray-100',
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const selectChevronVariants = tv({
  base: 'h-5 w-5 transition-transform duration-300',
  variants: {
    open: {
      true: 'rotate-180 fill-green-100',
      false: 'rotate-0 fill-gray-200',
    },
  },
  defaultVariants: {
    open: false,
  },
});

export const selectMenuVariants = tv({
  base: `
    absolute left-0 right-0 top-full z-10 w-full mt-2 rounded-lg bg-gray-500 border border-gray-300 py-2
  `,
});

export const selectItemVariants = tv({
  base: `
    w-full px-4 py-2 text-left text-sm
    transition-colors duration-200 hover:bg-gray-50
    flex items-center justify-between
  `,
  variants: {
    active: {
      true: 'font-semibold text-gray-100',
      false: 'font-normal text-gray-100',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.ComponentProps<'button'>, 'value' | 'onChange'>,
    VariantProps<typeof selectTriggerVariants> {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function Select({
  label,
  placeholder = 'Selecione',
  options,
  value,
  onValueChange,
  className,
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');

  const selectedValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);

  const handleSelect = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className={selectLabelVariants({ open })}>{label}</label>

      <button
        type="button"
        className={selectTriggerVariants({ open, className })}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        {...props}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <CaretDown className={selectChevronVariants({ open })} />
      </button>

      {open && (
        <ul className={selectMenuVariants()} role="listbox">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={selectItemVariants({ active: option.value === selectedValue })}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={option.value === selectedValue}
              >
                <>
                  <span>{option.label}</span>
                  {option.value === selectedValue && (
                    <Check className={'h-5 w-5 fill-green-100'} />
                  )}
                </>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import { tv, type VariantProps } from 'tailwind-variants';
import IconButton from './icon-button';

import CloudArrowUp from '../assets/icons/cloud-arrow-up.svg?react';
import Container from './container';
import React, { useRef } from 'react';
import { useWatch, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form';
import Text from './text';

export const inputFileVariants = tv({
  base: `
    h-12 w-full peer outline-none text-sm text-gray-100 px-4 py-4 
    rounded-lg border-2 border-gray-300 transition-colors duration-300
    placeholder:text-gray-200
    focus-within:border-green-100 
  `,
  variants: {},
  defaultVariants: {},
});

export const inputLabelVariants = tv({
  base: 'mb-2 text-xs uppercase peer-focus-within:text-green-100 transition-colors duration-300',
});

export interface InputFileProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<'input'>, 'form' | 'name'>,
    VariantProps<typeof inputFileVariants> {
  label?: string;
  form: Pick<UseFormReturn<TFieldValues>, 'control'>,
  name: Path<TFieldValues>;
  allowedExtensions?: string[],
  maxFileSizeMB?: number,
  error?: string
}

export default function InputFile<TFieldValues extends FieldValues>({
  label,
  form,
  allowedExtensions = ['pdf', 'png'],
  maxFileSizeMB = 1,
  error,
  id,
  name,
  className,
  ref: externalRef,
  ...props
}: InputFileProps<TFieldValues>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? 'input-file-id';
  const formValues = useWatch({ control: form.control });
  const formFile: File = React.useMemo(
    () => formValues[name]?.[0],
    [formValues, name]
  );
  
  const {fileExtension, fileSize} = React.useMemo(() => ({
    fileExtension: formFile?.name?.split('.')?.pop()?.toLowerCase() || '',
    fileSize: formFile?.size || 0
  }), [formFile]);

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension);
  }

  function isValidSize() {
    return fileSize <= maxFileSizeMB * 1024 * 1024;
  }

  function setInputRef(element: HTMLInputElement | null) {
    inputRef.current = element;

    if (typeof externalRef === 'function') {
      externalRef(element);
    }
  }

  return (
    <Container className="flex flex-col-reverse w-full">
      {error && <Text color='warning'>{error}</Text>}
      {formFile && !isValidExtension() && <Text color='warning'>Extensão do arquivo não é permitida</Text>}
      {formFile && !isValidSize() && <Text color='warning'>Tamanho do arquivo ultrapassa limite</Text>}
      <Container className='flex flex-col-reverse'>
        <input
          id={inputId}
          ref={setInputRef}
          name={name}
          type='file'
          className={inputFileVariants({ className })}
          {...props} />
        <IconButton icon={CloudArrowUp} onClick={()=> inputRef.current?.click()} className='absolute self-end' />
        {label && 
          <label htmlFor={inputId} className={inputLabelVariants()}>
            {label}
          </label>
        }
      </Container>
    </Container>
  );
};

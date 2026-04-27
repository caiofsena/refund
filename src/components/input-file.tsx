import { tv, type VariantProps } from 'tailwind-variants';
import IconButton from './icon-button';

import CloudArrowUp from '../assets/icons/cloud-arrow-up.svg?react';
import Container from './container';
import React, { useRef } from 'react';
import { useWatch } from 'react-hook-form';
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

export interface InputFileProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputFileVariants> {
  label?: string;
  form: any,
  allowedExtensions?: string[],
  maxFileSizeMB?: number
}

export default function InputFile({
  label,
  form,
  allowedExtensions = ['pdf', 'png'],
  maxFileSizeMB = 1,
  id,
  name,
  className,
  ...props
}: InputFileProps) {
  const inputRef = useRef(null);
  const inputId = id ?? label ? label.toLowerCase().replace(/\s+/g, '-') : 'input-file-id';
  const formValues = useWatch({control: form.control});
  const formFile: File = React.useMemo(
    () => formValues[name]?.[0],
    [formValues, name]
  );
  console.log('InputFile: ', form);
  
  const {fileExtension, fileSize} = React.useMemo(() => ({
    fileExtension: formFile?.name?.split('.')?.pop()?.toLowerCase() || '',
    fileSize: formFile?.size || 0
  }), [formFile]);

  function isValidExtension() {
    console.log('isValidExtension: ', fileExtension);
    
    return allowedExtensions.includes(fileExtension);
  }

  function isValidSize() {
    console.log('isValidExtension: ', fileSize);
    return fileSize <= maxFileSizeMB * 1024 * 1024;
  }

  return (
    <Container className="flex flex-col-reverse w-full">
      {formFile && !isValidExtension() && <Text color='warning'>Extensão do arquivo não é permitida</Text>}
      {formFile && !isValidSize() && <Text color='warning'>Tamanho do arquivo ultrapassa limite</Text>}
      <Container className='flex flex-col-reverse'>
        <input
          id={inputId}
          ref={inputRef}
          type='file'
          className={inputFileVariants({ className })}
          {...props} />
        <IconButton icon={CloudArrowUp} onClick={()=> inputRef.current.click()} className='absolute self-end' />
        {label && 
          <label htmlFor={inputId} className={inputLabelVariants()}>
            {label}
          </label>
        }
      </Container>
    </Container>
  );
};
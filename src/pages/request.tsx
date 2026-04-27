import Button from '../components/button';
import Container from '../components/container';
import Icon from '../components/icon';
import Input from '../components/input';
import Select from '../components/select';
import Text from '../components/text';

import FileBold from '../assets/icons/file-bold.svg?react';
import InputFile from '../components/input-file';
import { useForm, type SubmitHandler } from 'react-hook-form';

type Inputs = {
  receipt: string,
};

export default function Request() {
  const form = useForm();
  const hasFile = false;

  const onSubmit: SubmitHandler<Inputs> = data => {console.log(data)};

  return (
    <Container size='sm' className='w-full self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10">
        <Container className='flex flex-col'>
          <Text variant='heading-lg-bold' color='secondary'>Solicitação de reembolso</Text>
          <Text className='mt-3'>Dados da despesa para solicitar reembolso.</Text>
        </Container>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container className='flex flex-col mt-10 gap-8'>
            <Input
              id='input-request-name'
              label='Nome da solicitação'
              {...form.register('name')}
            />
            <Container className='flex gap-4'>
              <Select
                label="Categoria"
                options={[
                  { value: 'alimentacao', label: 'Alimentação' },
                  { value: 'hospedagem', label: 'Hospedagem' },
                  { value: 'transporte', label: 'Transporte' },
                  { value: 'servicos', label: 'Serviços' },
                  { value: 'outros', label: 'Outros' },
                ]}
              />
              <Input
                id='input-request-currency'
                label='Valor'
              />
            </Container>
            <Container className='flex'>
              {hasFile ? (
                <Container className='flex items-center justify-center gap-2 cursor-pointer' onClick={() => alert('Container clicked!')}>
                  <Icon svg={FileBold}  />
                  <Text variant='body-md-semibold' color='tertiary'>Abrir comprovante</Text>
                </Container>
              ) : (
                <InputFile id='receipt' form={form} label='Comprovante' /*{...form.register('receipt')}*/ />
              )}
            </Container>
            <Button type='submit' >Enviar</Button>
          </Container>
        </form>
      </Container>
    </Container>
  )
}
import Button from '../components/button';
import Container from '../components/container';
import Icon from '../components/icon';
import Input from '../components/input';
import Select from '../components/select';
import Text from '../components/text';

import FileBold from '../assets/icons/file-bold.svg?react';

export default function Request() {
  return (
    <Container size='sm' className='w-full self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10">
        <Container className='flex flex-col'>
          <Text variant='heading-lg-bold' color='secondary'>Solicitação de reembolso</Text>
          <Text className='mt-3'>Dados da despesa para solicitar reembolso.</Text>
        </Container>
        <Container className='flex flex-col mt-10 gap-8'>
          <Input
            id='input-request-name'
            label='Nome da solicitação'
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
          <Container className='flex items-center justify-center gap-2 cursor-pointer' onClick={() => alert('Container clicked!')}>
            <Icon svg={FileBold}  />
            <Text variant='body-md-semibold' color='tertiary'>Abrir comprovante</Text>
          </Container>
          <Button onClick={() => alert('Button clicked!')}>Enviar</Button>
        </Container>
      </Container>
    </Container>
  )
}
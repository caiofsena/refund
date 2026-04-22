import { Button } from '../components/button';
import { IconButton } from '../components/icon-button';
import { Input } from '../components/input';
import { Select } from '../components/select';

import MagnifyingGlass from '../assets/icons/magnifying-glass.svg?react';
import Container from '../components/container';
import Text from '../components/text';

export default function Home() {
  return (
    <Container size='md' className='w-full self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10 gap-6">
        <Text variant='heading-lg-bold' color='secondary'>Solicitações</Text>

        <Container className='flex'>
          <Input
              id='input-search-name'
              placeholder="Pesquisar pelo nome"
            />
            <IconButton
              icon={MagnifyingGlass}
              onClick={() => alert('Icon button clicked!')}
              className='ml-3'
            />
        </Container>

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

        <Button onClick={() => alert('Button clicked!')}>Click me</Button>
      </Container>

    </Container>
  );
}
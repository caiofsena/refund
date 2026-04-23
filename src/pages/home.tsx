// import { Button } from '../components/button';
import { IconButton } from '../components/icon-button';
import { Input } from '../components/input';
// import { Select } from '../components/select';

import Container from '../components/container';
import Text from '../components/text';
import RequestItem from '../core/request-item';

import MagnifyingGlass from '../assets/icons/magnifying-glass.svg?react';
import ForkKnife from '../assets/icons/fork-knife-fill.svg?react';
import Bed from '../assets/icons/bed-fill.svg?react';
import PoliceCar from '../assets/icons/police-car-fill.svg?react';
import Wrench from '../assets/icons/wrench-fill.svg?react';
import Receipt from '../assets/icons/receipt-fill.svg?react';
import CaretLeft from '../assets/icons/caret-left.svg?react';
import CaretRight from '../assets/icons/caret-right.svg?react';

export default function Home() {
  return (
    <Container size='md' className='w-full self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10 gap-6">
        <Text variant='heading-lg-bold' color='secondary'>Solicitações</Text>

        <Container className='flex pb-6 border-b border-b-gray-400'>
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

        <Container className='flex flex-col gap-4'>
          <RequestItem icon={ForkKnife} title='Rodrigo' description='Alimentação' currency='34,78' />
          <RequestItem icon={Bed} title='Tamires' description='Hospedagem' currency='1.200,00' />
          <RequestItem icon={ForkKnife} title='Lara' description='Alimentação' currency='12,35' />
          <RequestItem icon={PoliceCar} title='Elias' description='Transporte' currency='47,65' />
          <RequestItem icon={Wrench} title='Thiago' description='Serviços' currency='99,90' />
          <RequestItem icon={Receipt} title='Vinicius' description='Outros' currency='25,89' />
        </Container>

        <Container className='flex gap-2.5 items-center justify-center'>
          <IconButton icon={CaretLeft} size='md' />
          <Text>1/3</Text>
          <IconButton icon={CaretRight} size='md'  />
        </Container>

        {/* <Select
          label="Categoria"
          options={[
            { value: 'alimentacao', label: 'Alimentação' },
            { value: 'hospedagem', label: 'Hospedagem' },
            { value: 'transporte', label: 'Transporte' },
            { value: 'servicos', label: 'Serviços' },
            { value: 'outros', label: 'Outros' },
          ]}
        />

        <Button onClick={() => alert('Button clicked!')}>Click me</Button> */}
      </Container>

    </Container>
  );
}
import Button from '../components/button';
import Container from '../components/container';
import Text from '../components/text';

import CheckCircle from '../assets/images/check-circle.svg?react';

export default function Success() {
  return (
    <Container size='sm' className='w-full self-center rounded-2xl bg-white'>
      <Container className="flex flex-col p-10">
        <Container className='flex flex-col items-center gap-6'>
          <Text variant='heading-lg-bold' color='secondary'>Solicitação enviada!</Text>
          <CheckCircle />
          <Text color='secondary' className='text-center'>
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.
          </Text>
        </Container>
        <Container className='flex flex-col mt-10'>
          <Button onClick={() => alert('Button clicked!')}>Nova solicitação</Button>
        </Container>
      </Container>
    </Container>
  )
}
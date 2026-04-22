import Container from '../components/container';

import LogoRefund from '../assets/logo-refund.svg?react';
import { NavLink } from '../components/nav-link';
import { Button } from '../components/button';

export default function Header() {
  return(
    <Container className='flex px-20 py-10 items-center'>
      <Container className='flex-1 justify-between'>
        <LogoRefund />
      </Container>
      <NavLink to='#' className='m-4'>Solicitações de reembolso</NavLink>
      <Button>Nova Solicitação</Button>
    </Container>
  )
}
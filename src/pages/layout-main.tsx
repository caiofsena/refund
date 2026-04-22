import { Outlet } from 'react-router';
import MainContent from '../core/main-content';
import Header from '../core/header';

export default function LayoutMain() {
  return (
    <MainContent>
      <Header />
      <Outlet />
    </MainContent>
  )
}
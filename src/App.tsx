import { Button } from './components/button';
import { IconButton } from './components/icon-button';
import { Input } from './components/input';
import { NavLink } from './components/nav-link';
import MagnifyingGlass from './assets/icons/magnifying-glass.svg?react';

function App() {
  return (
    <div className="bg-gray-500 min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1>Refunds</h1>

      <div className="w-full max-w-md">
        <Input
          id='input-test'
          label="Buscar reembolso"
          placeholder="Digite o termo..."
        />
      </div>

      <div className="flex gap-4">
        <NavLink to="#">
          Início
        </NavLink>
        <NavLink to="#">
          Histórico
        </NavLink>
        <NavLink to="#">
          Relatórios
        </NavLink>
      </div>

      <Button onClick={() => alert('Button clicked!')}>Click me</Button>

      <IconButton
        icon={MagnifyingGlass}
        onClick={() => alert('Icon button clicked!')}
      />
    </div>
  );
}

export default App;
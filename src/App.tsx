import { BrowserRouter, Route, Routes } from 'react-router';
import LayoutMain from './pages/layout-main';
import Home from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
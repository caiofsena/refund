import { BrowserRouter, Route, Routes } from 'react-router';
import LayoutMain from './pages/layout-main';
// import Home from './pages/home';
import Request from './pages/request';
// import Success from './pages/success';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Request />} />
          {/* <Route index element={<Success />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
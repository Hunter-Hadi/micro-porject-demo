import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* 子应用路由占位，防止 404 */}
          <Route path="product/*" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

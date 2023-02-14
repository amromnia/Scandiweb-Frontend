import logo from './logo.svg';
import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//https://www.notion.so/Junior-Developer-Test-Task-1b2184e40dea47df840b7c0cc638e61e
function App() {
  const Index = React.lazy(() => import('./pages/index'));
  const ProductList = React.lazy(() => import('./pages/ProductList'));
  const AddProduct = React.lazy(() => import('./pages/AddProduct'));
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './pages/components/Navbar';
import Store from './pages/store/Store';
import Span from './pages/components/Span';
import ProductDetail from './pages/components/ProductDetail';
import Login from './pages/components/Login';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './hooks/useCart';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <CartProvider>
        <Span />
        <Navbar setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Store searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Toaster />
      </CartProvider>
      </Router>
  );
}

export default App;

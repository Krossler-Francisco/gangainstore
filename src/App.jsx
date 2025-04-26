import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './pages/components/Navbar';
import Store from './pages/store/Store';
import Span from './pages/components/Span';
import ProductDetail from './pages/components/ProductDetail';
import Login from './pages/components/Login';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './hooks/useCart';
import { MercadoPagoProvider } from './context/MercadoPagoContext';
import Success from './pages/components/Success';
import Proximamente from './pages/components/Proximamente';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [filters, setFilters] = useState({
    search: "",
    sort: "mas-vendidos",
    stock: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  return (
    <>
    <Analytics />
      <Router>
        <MercadoPagoProvider>
          <CartProvider>
            <Span />
            <Navbar setSearchTerm={(term) => setFilters({ ...filters, search: term })} />
            <Routes>
            <Route path="/" element={<Store setFilters={setFilters} filters={filters} />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path="/success" element={<Success />} />
              <Route path="/" element={<Store setFilters={setFilters} filters={filters} />} />
              <Route path="/proximamente" element={<Proximamente />} />
            </Routes>
            <Toaster />
          </CartProvider>
        </MercadoPagoProvider>
        </Router>
      </>
  );
}

export default App;

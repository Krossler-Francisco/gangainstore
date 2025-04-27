import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './hooks/useCart';
import { MercadoPagoProvider } from './context/MercadoPagoContext';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './pages/components/Navbar';
import Store from './pages/store/Store';
import Span from './pages/components/Span';
import ProductDetail from './pages/components/ProductDetail';
import Login from './pages/components/Login';
import Proximamente from './pages/components/Proximamente';
import Dashboard from './pages/components/Dashboard';
import Footer from './pages/components/Footer';
import PrivacyPolicy from './pages/components/PrivacyPolicy';
import TermsAndConditions from './pages/components/TermsAndConditions';
import ConfirmOrder from './pages/components/ConfirmOrder';

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
              <Route path="/confirm-order" element={<ConfirmOrder />} />
              <Route path="/proximamente" element={<Proximamente />} />
              <Route path="/my-account/*" element={<Dashboard/>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />\
              <Route path="/terms" element={<TermsAndConditions />} />
            </Routes>
            <Footer/>
            <Toaster />
          </CartProvider>
        </MercadoPagoProvider>
        </Router>
      </>
  );
}

export default App;

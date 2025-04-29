import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './hooks/useCart';
import { MercadoPagoProvider } from './context/MercadoPagoContext';
import { useAuth } from './context/AuthContext';
import PublicLayout from './pages/components/PublicLayout';
import AdminLayout from './pages/components/AdminLayout';

// Tus páginas
import Store from './pages/store/Store';
import ProductDetail from './pages/components/ProductDetail';
import Login from './pages/components/Login';
import ConfirmOrder from './pages/components/ConfirmOrder';
import Proximamente from './pages/components/Proximamente';
import Dashboard from './pages/components/Dashboard';
import PrivacyPolicy from './pages/components/PrivacyPolicy';
import TermsAndConditions from './pages/components/TermsAndConditions';
import AdminDashboard from './pages/components/AdminDashboard';

function App() {
  const [filters, setFilters] = useState({
    search: "",
    sort: "mas-vendidos",
    stock: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  const { user } = useAuth();

  return (
    <>
      <Analytics />
      <Router>
        <MercadoPagoProvider>
          <CartProvider>
            <Routes>
              {/* Rutas públicas */}
              <Route element={<PublicLayout setFilters={setFilters} />}>
                <Route path="/" element={<Store setFilters={setFilters} filters={filters} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/confirm-order" element={<ConfirmOrder />} />
                <Route path="/proximamente" element={<Proximamente />} />
                <Route path="/my-account/*" element={<Dashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
              </Route>

              {/* Rutas admin */}
              {user && user.admin === true && (
                <Route path="/admin/*" element={<AdminDashboard />}>
                </Route>
              )}
            </Routes>

            <Toaster />
          </CartProvider>
        </MercadoPagoProvider>
      </Router>
    </>
  );
}

export default App;

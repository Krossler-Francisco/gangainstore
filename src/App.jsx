import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './pages/components/Navbar';
import Store from './pages/store/Store';
import Span from './pages/components/Span';
import ProductDetail from './pages/components/ProductDetail';
import Login from './pages/components/Login';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <Span />
      <Navbar setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Store searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

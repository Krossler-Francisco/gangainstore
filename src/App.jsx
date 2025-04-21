import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/components/Navbar';
import Store from './pages/store/Store';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />} />
      </Routes>
    </Router>
  );
}

export default App;
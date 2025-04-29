import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Span from './Span';

function PublicLayout({ setFilters }) {
  return (
    <>
      <div className="no-display">
        <Span />
        <Navbar setSearchTerm={(term) => setFilters((prev) => ({ ...prev, search: term }))} />
      </div>
      <Outlet />
      <div className="no-display">
        <Footer />
      </div>
    </>
  );
}

export default PublicLayout;

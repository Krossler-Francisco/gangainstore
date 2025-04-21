import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <h1>gangain</h1>
          <span>BUENOS AIRES</span>
        </div>
        <ul className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <Link to="/about">Nosotros</Link>
          <Link to="/contact">Medios de Pago</Link>
          <Link to="/terms">Mayoristas</Link>
          <Link to="/shipping">Envios</Link>
          <Link to="/returns">Devoluciones</Link>
        </ul>
      </nav>

      <div className="navbar-actions">
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <button type="submit">
            <FiSearch size={18} />
          </button>
        </div>

        <div className="user-actions">
          <div className="user-profile">
            <FiUser size={24} />
            <p>Iniciar Sesión</p>
          </div>
          <div className="cart-button">
            <FiShoppingCart size={24} />
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

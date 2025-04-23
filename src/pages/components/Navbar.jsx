import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CartSidebar from "./CartSidebar";

function Navbar({ setSearchTerm }) {
  const [input, setInput] = useState("");
  const { user, logout } = useAuth();
  const [showAccountComponent, setShowAccountComponent] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleAccontComponent = () => {
    setShowAccountComponent(!showAccountComponent);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          <h1 className="navbar-title">gangain</h1>
          <span className="navbar-subtitle">BUENOS AIRES</span>
        </Link>


        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>Nosotros</Link>
          <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>Medios de Pago</Link>
          <Link className="nav-link" to="/terms" onClick={() => setMenuOpen(false)}>Mayoristas</Link>
          <Link className="nav-link" to="/shipping" onClick={() => setMenuOpen(false)}>Envios</Link>
          <Link className="nav-link" to="/returns" onClick={() => setMenuOpen(false)}>Devoluciones</Link>
        </ul>
      </nav>

      <div className="navbar-actions">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="search-button" type="submit">
            <FiSearch size={18} />
          </button>
        </form>

        <div className="user-actions">
          <div className="user-profile">
            {user ? (
              <div onMouseEnter={toggleAccontComponent} onMouseLeave={toggleAccontComponent} className="login-button">
                <FiUser size={18} />
                <p>Mi cuenta</p>
                {showAccountComponent && (
                  <div className="account-component">
                    <Link to={"/my-account"} className="account-option" >Escritorio</Link>
                    <Link to={"/my-account/orders"} className="account-option" >Pedidos</Link>
                    <Link to={"/my-account/addresses"} className="account-option" >Direcciones</Link>
                    <Link to={"/my-account/details"} className="account-option" >Detalles de la cuenta</Link>
                    <Link to={"/my-account/favorites"} className="account-option" >Favoritos</Link>
                    <Link to={"/login"} className="account-option" onClick={logout}>Salir</Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-button">
                <FiUser size={18} />
                <p className="login-text">Iniciar Sesión</p>
              </Link>
            )}
          </div>
          <div className="cart-button" onClick={() => setShowCart(!showCart)}>
            <FiShoppingCart size={18} />
          </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </div>
        </div>
      </div>
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}

export default Navbar;

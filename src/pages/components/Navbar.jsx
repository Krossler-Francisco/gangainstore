import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import "./Navbar.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar({ setSearchTerm }) {
  const [input, setInput] = useState("");
  const { user, logout } = useAuth();
  const [showAccountComponent, setShowAccountComponent] = useState(false);

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
        <div className="logo">
          <h1 className="navbar-title">gangain</h1>
          <span className="navbar-subtitle">BUENOS AIRES</span>
        </div>
        <ul className="nav-links">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/about">Nosotros</Link>
          <Link className="nav-link" to="/contact">Medios de Pago</Link>
          <Link className="nav-link" to="/terms">Mayoristas</Link>
          <Link className="nav-link" to="/shipping">Envios</Link>
          <Link className="nav-link" to="/returns">Devoluciones</Link>
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
          <Link className="user-profile">
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
              <div to="/login" className="login-button">
                <FiUser size={18} />
                <p>Iniciar Sesión</p>
              </div>
            )}
          </Link>
          <div className="cart-button">
            <FiShoppingCart size={18} />
            <span className="cart-count"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import { MdDashboard, MdShoppingCart, MdPeople, MdSettings, MdLogout } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-content">
        <MdDashboard className="admin-icon" />
        <h1>AdminGangain</h1>
      </div>

      <nav className="admin-navbar-menu">
        <ul>
          <li className={isActive("/admin") ? "selectedAdmin" : ""}>
            <Link to="/admin">
              <MdDashboard className="menu-icon" /> Dashboard
            </Link>
          </li>
          <li className={isActive("/admin/products") ? "selectedAdmin" : ""}>
            <Link to="/admin/products">
              <FaBoxOpen className="menu-icon" /> Productos
            </Link>
          </li>
          <li className={isActive("/admin/orders") ? "selectedAdmin" : ""}>
            <Link to="/admin/orders">
              <MdShoppingCart className="menu-icon" /> Pedidos
            </Link>
          </li>
          <li className={isActive("/admin/users") ? "selectedAdmin" : ""}>
            <Link to="/admin/users">
              <MdPeople className="menu-icon" /> Usuarios
            </Link>
          </li>
          <li className={isActive("/admin/settings") ? "selectedAdmin" : ""}>
            <Link to="/admin/settings">
              <MdSettings className="menu-icon" /> Estadísticas
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="admin-navbar-footer">
          <nav className="admin-navbar-menu nav-footer">
            <ul>
              <li>
                <Link to="/">
                  <MdLogout className="menu-icon" /> Salir
                </Link>
              </li>
            </ul>
          </nav>
      </footer>
    </div>
  );
}

export default AdminNavbar;

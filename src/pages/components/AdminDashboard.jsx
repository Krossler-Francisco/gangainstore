import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "./AdminHome";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminSettings from "./AdminSettings";
import "./AdminDashboard.css";

function AdminDashboard() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") return "Dashboard";
    if (location.pathname === "/admin/products") return "Productos";
    if (location.pathname === "/admin/orders") return "Pedidos";
    if (location.pathname === "/admin/users") return "Usuarios";
    if (location.pathname === "/admin/settings") return "Estadísticas";
    return "";
  };

  const renderComponent = () => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") return <AdminHome />;
    if (location.pathname === "/admin/products") return <AdminProducts />;
    if (location.pathname === "/admin/orders") return <AdminOrders />;
    if (location.pathname === "/admin/users") return <AdminUsers />;
    if (location.pathname === "/admin/settings") return <AdminSettings />;
    return null;
  };

  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <AdminNavbar />
      </div>
      <div className="main-content">
        <div className="header">
          <h2>{getTitle()}</h2>
          <h2 className="current-date">
            {(() => {
              const date = new Date();
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('es-AR', { month: 'long' });
              const year = date.getFullYear();
              return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
            })()}
          </h2>
        </div>
        <div className="content">
          <div className="content-wrapper">
          {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

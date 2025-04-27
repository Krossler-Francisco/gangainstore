import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Dashboard.css";

import DashboardMain from "./DashboardMain";
import DashboardPedidos from "./DashboardPedidos";
import DashboardDetalles from "./DashboardDetalles";
import DashboardFavoritos from "./DashboardFavoritos";

function Dashboard() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const getTitle = () => {
        if (location.pathname === "/my-account") return "Escritorio";
        if (location.pathname === "/my-account/orders") return "Pedidos";
        if (location.pathname === "/my-account/details") return "Detalles de la cuenta";
        if (location.pathname === "/my-account/favorites") return "Favoritos";
        return "";
    };

    const renderComponent = () => {
        if (location.pathname === "/my-account") return <DashboardMain user={user} />;
        if (location.pathname === "/my-account/orders") return <DashboardPedidos />;
        if (location.pathname === "/my-account/details") return <DashboardDetalles />;
        if (location.pathname === "/my-account/favorites") return <DashboardFavoritos />;
        return null;
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h1>Mi Cuenta</h1>
                    <h2>{getTitle()}</h2>
                </div>
                <div className="dashboard-body">
                    <div className="dashboard-content">
                        <nav className="dashboard-navbar">
                            <ul>
                                {user ? <h1>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1> : <h1>Admin</h1>}
                                <NavLink 
                                    to="/my-account" 
                                    className={({ isActive }) => isActive ? "select a b" : "a b"}
                                    end
                                >
                                    Escritorio
                                </NavLink>
                                <NavLink 
                                    to="/my-account/orders" 
                                    className={({ isActive }) => isActive ? "select a b" : "a b"}
                                >
                                    Pedidos
                                </NavLink>
                                <NavLink 
                                    to="/my-account/details" 
                                    className={({ isActive }) => isActive ? "select a b" : "a b"}
                                >
                                    Detalles de la cuenta
                                </NavLink>
                                <NavLink 
                                    to="/my-account/favorites" 
                                    className={({ isActive }) => isActive ? "select a b" : "a b"}
                                >
                                    Favoritos
                                </NavLink>
                                <NavLink 
                                    to="/"
                                    onClick={logout}
                                    className={({ isActive }) => isActive ? "select a" : "a"}
                                >
                                    Salir
                                </NavLink>
                            </ul>
                        </nav>
                        <div className="dashboard-components-container">
                            {user ? renderComponent() : (
                                <div className="no-user">
                                {!user && <Navigate to="/login" />}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

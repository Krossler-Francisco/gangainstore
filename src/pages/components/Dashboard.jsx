import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard-container">
        <div className="dashboard-header">
            <div className="dashboard-title">
            <h1>Mi Cuenta</h1>
            <h2>Escritorio</h2>
            </div>
        <div className="dashboard-body">
            <div className="dashboard-content">
                <nav>
                    <ul>
                        <Link to="/my-account">Escritorio</Link>
                        <Link to="/my-account/orders">Pedidos</Link>
                        <Link to="/my-account/addresses">Direcciones</Link>
                        <Link to="/my-account/details">Detalles de la cuenta</Link>
                        <Link to="/my-account/favorites">Favoritos</Link>
                        <Link to="/loggout">Salir</Link>
                    </ul>
                </nav>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Dashboard
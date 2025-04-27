import { Link } from "react-router-dom"
import "./DashboardMain.css"

function DashboardMain({user}) {

  return (
    <div className="main-container">
        <h2>Hola {user.username.charAt(0).toUpperCase() + user.username.slice(1)}, Bienvenido</h2>
        <p>Desde el panel de tu cuenta puedes ver tu historial de compras, productos favoritos y detalles de tu cuenta.</p>
        <div className="main-links-container">
            <Link to={"./orders"}>Pedidos</Link>
            <Link to={"./details"}>Mis datos</Link>
            <Link to={"./favorites"}>Favoritos</Link>
        </div>
    </div>
  )
}

export default DashboardMain
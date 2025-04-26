import { Link } from "react-router-dom"
import "./DashboardMain.css"

function DashboardMain() {
  return (
    <div className="main-container">
        <h2>Hola Admin, Bienvenido</h2>
        <p>Desde el escritorio de tu cuenta puedes ver tu historial de compras, productos favoritos y detalles de tu cuenta.</p>
        <div className="main-links-container">
            <Link to={"./orders"}>Pedidos</Link>
            <Link to={"./details"}>Detalles</Link>
            <Link to={"./favorites"}>Favoritos</Link>
        </div>
    </div>
  )
}

export default DashboardMain
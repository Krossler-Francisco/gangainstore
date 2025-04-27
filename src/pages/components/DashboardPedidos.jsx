import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./DashboardPedidos.css";

function DashboardPedidos() {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [userSales, setUserSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch("/api/get-pedidos");
        const data = await res.json();
        setSales(data);

        if (user && user.email) {
          const filteredSales = data.filter((sale) => sale.cliente.email === user.email);
          setUserSales(filteredSales);
        }
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    }

    fetchSales();
  }, [user]);

  return (
    <div className="dashboard-pedidos">
      <h2>Mis Pedidos</h2>
      {userSales.length > 0 ? (
        <table className="tabla-pedidos">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userSales.map((sale) => (
              <tr key={sale._id}>
                <td data-label="Pedido">#{sale._id.slice(-6).toUpperCase()}</td>
                <td data-label="Fecha">{new Date(sale.fecha).toLocaleString()}</td>
                <td data-label="Estado">{sale.estado.charAt(0).toUpperCase() + sale.estado.slice(1)}</td>
                <td data-label="Total">${sale.total}</td>
                <td data-label="Acciones">
                  <button className="ver-detalles-btn">Ver detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes pedidos aún.</p>
      )}
    </div>
  );
}

export default DashboardPedidos;

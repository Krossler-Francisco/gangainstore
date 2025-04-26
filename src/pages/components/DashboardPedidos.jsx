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
        userSales.map((sale) => (
          <div key={sale._id} className="pedido">
            <h3>Pedido ID: {sale._id}</h3>
            <p>Estado: {sale.estado}</p>
            <p>Fecha: {new Date(sale.fecha).toLocaleString()}</p>

            <h4>Productos:</h4>
            <ul>
              {sale.productos.map((producto) => (
                <li key={producto.id}>
                  {producto.name} - Cantidad: {producto.quantity}
                </li>
              ))}
            </ul>

            <p>Total: ${sale.total}</p>
          </div>
        ))
      ) : (
        <p>No tienes pedidos aún.</p>
      )}
    </div>
  );
}

export default DashboardPedidos;

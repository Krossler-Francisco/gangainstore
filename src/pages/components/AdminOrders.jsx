import { useEffect, useState } from "react";
import "./AdminOrders.css";
import { BsThreeDots } from "react-icons/bs";
import CustomSelect from "./CustomSelect";
import { FiCheckSquare, FiSquare, FiCheckCircle, FiClock } from "react-icons/fi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateOrder, setDateOrder] = useState("newest");

  useEffect(() => {
    fetch("/api/get-pedidos")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const renderEstado = (estado) => {
    const estadoFormatted = estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();

    if (estado.toLowerCase() === "aprobado") {
      return (
        <span className="estado aprobado">
          <FiCheckCircle className="checkbox2" style={{ color: "#4CAF50", marginRight: 6 }} />
          {estadoFormatted}
        </span>
      );
    }

    if (estado.toLowerCase() === "pendiente") {
      return (
        <span className="estado pendiente">
          <FiClock className="checkbox2" style={{ color: "#FFC107", marginRight: 6 }} />
          {estadoFormatted}
        </span>
      );
    }
    return <span className="estado">{estadoFormatted}</span>;
  };

  const allSelected = orders.length > 0 && orders.every(order => selectedOrders[order._id.$oid]);
  const toggleSelectAll = () => {
    const newSelection = {};
    if (!allSelected) {
      orders.forEach(order => {
        newSelection[order._id.$oid] = true;
      });
    }
    setSelectedOrders(newSelection);
  };

  const getShortId = (_id) => {
    const idString = typeof _id === "object" && _id.$oid ? _id.$oid : _id;
    return idString.slice(-6);
  };

  const toggleSelect = (id) => {
    const idString = typeof id === "object" && id.$oid ? id.$oid : id;
    setSelectedOrders((prev) => ({
      ...prev,
      [idString]: !prev[idString],
    }));
  };

  const formatDate = (fechaRaw) => {
    let timestamp;
  
    // Soporta formato MongoDB exportado
    if (
      typeof fechaRaw === "object" &&
      fechaRaw.$date &&
      typeof fechaRaw.$date.$numberLong === "string"
    ) {
      timestamp = parseInt(fechaRaw.$date.$numberLong, 10);
    } else if (typeof fechaRaw === "string" && /^\d+$/.test(fechaRaw)) {
      timestamp = parseInt(fechaRaw, 10);
    } else if (typeof fechaRaw === "number") {
      timestamp = fechaRaw;
    } else {
      return "Fecha inválida";
    }
  
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }
  
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  

  const filteredOrders = orders
    .filter(order => {
      if (statusFilter === "all") return true;
      return order.estado.toLowerCase() === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return dateOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="orders-container">
      <div className="orders-content">
        <header className="filters-header">
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: "Todos" },
                { value: "pendiente", label: "Pendiente" },
                { value: "aprobado", label: "Aprobado" },
              ]}
            />
            <CustomSelect
              value={dateOrder}
              onChange={setDateOrder}
              options={[
                { value: "newest", label: "Más recientes" },
                { value: "oldest", label: "Más antiguos" },
              ]}
            />
          </header>
          <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={toggleSelectAll} style={{ cursor: "pointer" }}>
                  {allSelected ? (
                    <FiCheckSquare className="checkbox" style={{ color: "#65c61a" }} />
                  ) : (
                    <FiSquare className="checkbox" />
                  )}
                </th>
                <th>Pedido</th>
                <th>Comprador</th>
                <th>Estado</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const id = order._id.$oid;
                const isSelected = selectedOrders[id];

                return (
                  <tr key={id} className={isSelected ? "selected-row" : ""}>
                    <td onClick={() => toggleSelect(id)} style={{ cursor: "pointer" }}>
                      {isSelected ? (
                        <FiCheckSquare className="checkbox" style={{ color: "#65c61a" }} />
                      ) : (
                        <FiSquare className="checkbox" />
                      )}
                    </td>
                    <td>
                      #{getShortId(id)}
                      <div className="order-date">{formatDate(order.fecha)}</div>
                    </td>
                    <td>{order.cliente.fullname}</td>
                    <td>{renderEstado(order.estado)}</td>
                    <td>${order.total.$numberInt}</td>
                    <td className="last-children">
                      <BsThreeDots style={{ cursor: "pointer" }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="orders-details2">
        <section>aaaa</section>
      </div>
    </div>
  );
}

export default AdminOrders;

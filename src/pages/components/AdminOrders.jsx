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
    async function fetchSales() {
      try {
        const res = await fetch("/api/get-pedidos");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    }

    fetchSales();
  }, []);

  const getMongoId = (_id) => (typeof _id === "object" ? _id?.$oid : _id);

  const getShortId = (_id) => {
    const idString = getMongoId(_id);
    return idString?.slice(-6) || "------";
  };

  const renderEstado = (estado) => {
    if (typeof estado !== "string") {
      console.warn("Estado inválido detectado:", estado);
      return <span className="estado">Sin estado</span>;
    }

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

  const allSelected =
    orders.length > 0 && orders.every(order => selectedOrders[getMongoId(order._id)]);

  const toggleSelectAll = () => {
    const newSelection = {};
    if (!allSelected) {
      orders.forEach(order => {
        const id = getMongoId(order._id);
        if (id) newSelection[id] = true;
      });
    }
    setSelectedOrders(newSelection);
  };

  const toggleSelect = (id) => {
    const idString = getMongoId(id);
    setSelectedOrders((prev) => ({
      ...prev,
      [idString]: !prev[idString],
    }));
  };

  const formatDate = (fechaRaw) => {
    let timestamp;

    if (
      typeof fechaRaw === "object" &&
      fechaRaw?.$date?.$numberLong
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
    return isNaN(date.getTime())
      ? "Fecha inválida"
      : date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const filteredOrders = orders
    .filter(order => {
      if (!order || !order.estado) {
        console.warn("Orden sin estado:", order);
        return false;
      }
      return statusFilter === "all" || order.estado.toLowerCase() === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fecha?.$date?.$numberLong || a.fecha);
      const dateB = new Date(b.fecha?.$date?.$numberLong || b.fecha);
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
                const id = getMongoId(order._id);
                if (!id) return null;
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
                    <td>{order.cliente?.fullname || "Sin nombre"}</td>
                    <td>{renderEstado(order.estado)}</td>
                    <td>${parseInt(order.total?.$numberInt || "0", 10)}</td>
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

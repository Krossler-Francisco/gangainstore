import { useEffect, useState } from "react";
import "./AdminOrders.css";
import { BsThreeDots } from "react-icons/bs";
import CustomSelect from "./CustomSelect";
import { FiCheckSquare, FiSquare, FiCheckCircle, FiClock, FiDownloadCloud } from "react-icons/fi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateOrder, setDateOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch("/api/get-pedidos");
        const data = await res.json();
        setOrders(data);
        setLoading(false);
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
    try {
      console.log("Fecha recibida:", fechaRaw); // 👈 Log para depuración
      let date;
      
      // Caso 1: formato Mongo con $date.$numberLong
      if (fechaRaw?.$date?.$numberLong) {
        const timestamp = parseInt(fechaRaw.$date.$numberLong, 10);
        date = new Date(timestamp);
      }
      // Caso 2: ISO string o Date object
      else if (typeof fechaRaw === "string" || fechaRaw instanceof Date) {
        date = new Date(fechaRaw);
      }
      // Caso 3: Objeto con $date directamente
      else if (fechaRaw?.$date) {
        date = new Date(fechaRaw.$date);
      }
      
      if (!date || isNaN(date.getTime())) {
        console.warn("Fecha inválida luego de parsear:", date); // 👈 Otro log
        return "Fecha inválida";
      }
      
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (err) {
      console.error("Error formateando fecha:", err); // 👈 Log de error
      return "Fecha inválida";
    }
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
    
    const selectedOrderId = Object.keys(selectedOrders).find((id) => selectedOrders[id]);
    const selectedOrder = orders.find((order) => getMongoId(order._id) === selectedOrderId)
    
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
            <tbody className="table-body">
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    <FiDownloadCloud className="loading-icon" />
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
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
                      <td>${parseInt(order.total)}</td>
                      <td className="last-children">
                        <BsThreeDots style={{ cursor: "pointer" }} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="orders-details2">
        <div className="orders-details-content">
          {selectedOrder ? (
            <div className="orders-details-container2">
              <div className="orders-details-header2-line">
                <header className="orders-details-header">
                <h1>Pedido #{getShortId(selectedOrder._id)}</h1>
                <div className="orders-details-infostate-container">
                  <p><strong className="orders-details-infostate">{renderEstado(selectedOrder.estado)}</strong></p>
                  <p>Comprado el {formatDate(selectedOrder.fecha)}</p>
                </div>
                </header>
              </div>
              <div className="orders-details-header2-line">
                <header className="orders-details-header client">
                  <p className="details-cliet">Comprador</p>
                  <div className="details-client-info">
                  <p className="details-client-name">{selectedOrder.cliente?.fullname || "Não informado"}</p>
                  <p className="details-client-info-details">{selectedOrder.cliente?.email || "Não informado"}</p>
                  <p className="details-client-info-details">{selectedOrder.cliente?.phone || "Não informado"}</p>
                  </div>
                </header> 
              </div>
              <div className="orders-details-header2-line">
                <header className="orders-details-header client">
                  <p className="details-cliet">Compra</p>
                  <div className="details-client-info">
                    {selectedOrder.productos?.length > 0 && (
                      <ul className="no-padding">
                        <div className="details-client-info-item">
                        <div className="details-client-info-item-list">
                        {selectedOrder.productos.map((item, idx) => (
                          <li key={idx}>
                                <img src={item.img} alt={item.name} className="details-client-info-item-img" />
                              <div className="details-client-info-item-details">
                                <p>{item.name || "Produto"}</p>
                                <div className="flex">
                                <p className="strong">${item.desconto || 0}</p>x<p>{item.quantity}</p>
                                </div>
                              </div>
                            </li>
                        ))}
                        </div>
                        </div>
                      </ul>
                    )}
                    </div>
                </header> 
              </div>
              <div className="orders-details-header2-line">
                <header className="orders-details-header client">
                  <div className="paraf">
                    <strong className="strong2">Total:</strong>
                    <p>${parseInt(selectedOrder.total)}</p>
                  </div>
                </header>
              </div>
              </div>
          ) : (
            <div className="orders-details-container2">
              <div className="orders-details-header2-line">
                <header className="orders-details-header">
                <h1>Detalles</h1>
                <div className="orders-details-infostate-container">
                  <p><strong className="orders-details-infostate"></strong></p>
                  <p></p>
                </div>
                </header>
              </div>
              <div className="orders-details-header2-line">
                <header className="orders-details-header client">
                  <p className="details-cliet">Comprador</p>
                  <div className="details-client-info">
                  <p className="details-client-name">​</p>
                  <p className="details-client-info-details">​                  </p>
                  <p className="details-client-info-details">​                  </p>
                  </div>
                </header> 
              </div>
              <div className="orders-details-header2-line">
                <header className="orders-details-header client">
                  <p className="details-cliet">Compra</p>
                  <div className="details-client-info">
                      <ul className="no-padding">
                        <div className="details-client-info-item ">
                            <li >
                                <img src="" alt="" className="details-client-info-item-img" />
                              <div className="details-client-info-item-details">
                                <p>Produto</p>
                                <div className="flex">
                                <p className="strong">​
                                </p>​<p>​</p>
                                </div>
                              </div>
                            </li>
                        </div>
                      </ul>
                    </div>
                </header> 
              </div>
              <p><strong></strong>​</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;

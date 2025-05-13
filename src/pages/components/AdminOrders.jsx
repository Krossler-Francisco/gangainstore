import { useEffect, useState } from "react";
import "./AdminOrders.css";
import { BsThreeDots } from "react-icons/bs";
import CustomSelect from "./CustomSelect";
import { FiCheckSquare, FiSquare, FiCheckCircle, FiClock, FiDownloadCloud, FiPrinter, FiPackage, FiLoader, FiXCircle } from "react-icons/fi";
import EditOrderModal from "./EditOrderModal";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateOrder, setDateOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  
  const fetchSales = async () => {
    try {
      setLoading(true); // Opcional: mostrar loading al recargar también
      const res = await fetch("/api/get-pedidos");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Ejecutar al montar el componente
  useEffect(() => {
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

    if (estado.toLowerCase() === "entregue") {
      return (
        <span className="estado entregue">
          <FiPackage className="checkbox2" style={{ marginRight: 6 }} />
          {estadoFormatted}
        </span>
      );
    }

    if (estado.toLowerCase() === "cancelado") {
      return (
        <span className="estado cancelado">
          <FiXCircle className="checkbox2" style={{ marginRight: 6 }} />
          Cancelada
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
          <div className="filters-header-container">
            <CustomSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: "Todos" },
                { value: "pendiente", label: "Pendiente" },
                { value: "aprobado", label: "Aprobado" },
                { value: "cancelado", label: "Cancelado" },
                { value: "entregue", label: "Entregue" },
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
          </div>
              <FiLoader onClick={fetchSales} className="reload-btn" />
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
                <tr className="">
                  <td colSpan="6" className="loading-row">
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
          <button className="print-icon">
          <FiPrinter/>
          </button>
          {selectedOrder ? (
            <div className="orders-details-container2">
              <div className="orders-details-header2-line">
                <header className="orders-details-header">
                <h1>Pedido #{getShortId(selectedOrder._id)}</h1>
                <div className="orders-details-infostate-container">
                  <p><strong className="orders-details-infostate">{renderEstado(selectedOrder.estado)}</strong></p>
                  <p>Comprado {formatDate(selectedOrder.fecha)}</p>
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
                    <p className="details-client-info-details">{selectedOrder.cliente?.dni || "Não informado"}</p>
                    <p className="details-client-info-details">{selectedOrder.cliente?.street || "Não informado"}</p>
                    <p className="details-client-info-details">{selectedOrder.cliente?.city || "Não informado"}</p>
                    <p className="details-client-info-details">{selectedOrder.cliente?.province || "Não informado"}</p>
                    <p className="details-client-info-details">{selectedOrder.cliente?.details || "Não informado"}</p>
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
              <div>
                <header className="orders-details-header3 client">
                  <div className="paraf">
                    <strong className="strong2">Total:</strong>
                    <p>${parseInt(selectedOrder.total)}</p>
                  </div>
                </header>
              </div>
              </div>
          ) : (
            <div className="orders-details-container2">
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;

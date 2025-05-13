import React, { useState, useEffect } from 'react';
import './EditOrderModal.css'; // Puedes crear un archivo CSS para este modal

function EditOrderModal({ order, onClose, onOrderUpdated }) {
  const [editedOrder, setEditedOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (order) {
      setEditedOrder({ ...order }); // Inicializa el estado con la información del pedido
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedOrder),
      });

      if (res.ok) {
        const updatedData = await res.json();
        onOrderUpdated(updatedData); // Notifica al componente padre que el pedido se actualizó
        onClose(); // Cierra el modal
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Error al actualizar el pedido');
      }
    } catch (err) {
      setError('Error de conexión al intentar actualizar el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return null; // No renderizar si no hay un pedido para editar
  }

  return (
    <div className="edit-order-modal-overlay">
      <div className="edit-order-modal">
        <h2>Editar Pedido #{getShortId(editedOrder._id)}</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Campos de edición (ejemplo - ajusta según tus necesidades) */}
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={editedOrder.estado || ''}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="cancelado">Cancelado</option>
            <option value="entregue">Entregue</option>
            {/* Agrega más opciones de estado si es necesario */}
          </select>
        </div>

        {/* Puedes agregar más campos para editar otros detalles del pedido */}

        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <button onClick={onClose} disabled={loading}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function (puedes moverla a un archivo de utilidades si la usas en varios lugares)
const getShortId = (_id) => {
  const idString = typeof _id === "object" ? _id?.$oid : _id;
  return idString?.slice(-6) || "------";
};

export default EditOrderModal;
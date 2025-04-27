import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./ConfirmOrder.css";

function ConfirmOrder() {
  const { cart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderSaveError, setOrderSaveError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cliente = Object.fromEntries(formData.entries());
    const productos = cart;
    const total = productos.reduce((sum, item) => sum + item.desconto * item.quantity, 0);

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente, productos, total, status: 'pendiente' }),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        navigate(`/checkout?order_id=${data.orderId}`);
      } else {
        setOrderSaveError(true);
        alert(`Error al guardar: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setOrderSaveError(true);
    }
  };

  return (
    <div className="success-container-landing">
      <h2>Completa tus datos para finalizar la compra</h2>
      <div className="success-container">
        <section className="success-content">
          <div className="success-form-box">
            <form onSubmit={handleSubmit}>
              <div className="success-form-group">
                <label>Nombre y apellido *</label>
                <input type="text" name="fullname" required />
              </div>
              <div className="success-form-group">
                <label>Email *</label>
                <input type="email" name="email" required />
              </div>
              <div className="success-form-group">
                <label>Teléfono *</label>
                <input type="tel" name="phone" required />
              </div>
              <div className="success-form-group">
                <label>Calle *</label>
                <input type="text" name="street" required />
              </div>
              <div className="success-form-group">
                <label>Ciudad *</label>
                <input type="text" name="city" required />
              </div>
              <div className="success-form-group">
                <label>Provincia *</label>
                <input type="text" name="province" required />
              </div>
              <div className="success-form-group">
                <label>Código Postal *</label>
                <input type="text" name="zipcode" required />
              </div>
              <div className="success-form-group">
                <label>Detalles adicionales</label>
                <textarea name="details" rows="4" placeholder="Departamento, piso, referencias..."></textarea>
              </div>

              <button type="submit">Ir a pagar</button>
            </form>
          </div>
        </section>

        {/* RESUMEN DEL PEDIDO */}
        <section className="success-content">
          <div className="success-form-box">
            <p>Resumen del pedido:</p>
            <ul className="order-summary">
              {cart.map((item) => (
                <li key={item.id} className="order-item">
                  <img src={item.img} alt={item.name} className="order-img" />
                  <div className="order-details">
                    <p><strong>{item.name}</strong></p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${Number(item.desconto).toFixed(2)}</p>
                    <p>Total: ${(item.desconto * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <strong>Total: ${cart.reduce((total, item) => total + (item.desconto * item.quantity), 0).toFixed(2)}</strong>
            </div>
          </div>
        </section>
      </div>

      {/* modal de login opcional, se puede dejar ou sacar */}
      {showModal && (
        <div className="modal-container">
          <dialog className="modal" open={showModal}>
            <div className="modal-content">
              <h2>¿Te gustaría crear una cuenta?</h2>
              <p>Así podrás hacer un mejor seguimiento de tus pedidos y disfrutar de beneficios exclusivos.</p>
              <a href="/login" className="modal-link">Ingresar | Crear cuenta</a>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}

export default ConfirmOrder;

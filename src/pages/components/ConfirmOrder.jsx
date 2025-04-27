import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./ConfirmOrder.css";

function ConfirmOrder() {
  const mp = window.MercadoPago && new window.MercadoPago('APP_USR-4f89bd10-10f6-4b81-a3e9-abaed15c4452');
  const { cart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderSaveError, setOrderSaveError] = useState(false);
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cliente = Object.fromEntries(formData.entries());
    const productos = cart;
    const total = productos.reduce((sum, item) => sum + item.desconto * item.quantity, 0);

    try {
      // Primero guardamos la orden en nuestra DB
      const res = await fetch('/api/save',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente, productos, total, status: 'pendiente' }),
      });

      const data = await res.json();
      if (!res.ok) {
        setOrderSaveError(true);
        alert(`Error al guardar: ${data.error}`);
        return;
      }

      // Ahora creamos la preferencia en MercadoPago
      const checkoutRes = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: productos.map((item) => ({
            title: item.name,
            unit_price: Number(item.desconto),
            quantity: item.quantity,
          })),
        }),
      });

      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) {
        alert(`Error al crear preferencia: ${checkoutData.error}`);
        return;
      }

      setPreferenceId(checkoutData.preferenceId); // guardamos la preference para generar el botón
    } catch (error) {
      console.error('Error en checkout:', error);
      setOrderSaveError(true);
    }
  };

  // Este efecto se dispara cuando tenemos la preferenceId lista
  useEffect(() => {
    if (preferenceId && mp) {
      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: '#wallet_container', // ID del div donde va el botón
          label: 'PAGAR COM MERCADO PAGO',
        },
        customization: {
          visual: {
            buttonBackground: '#0e0e0e',
            buttonText: 'white',
            borderRadius: '6px',
            verticalPadding: '1rem', // padding arriba/abajo
            horizontalPadding: '1rem', // padding izquierda/derecha
            marginTop: '1rem',
            fontSize: '14px',
          },
        },
      });
    }
  }, [preferenceId]);


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
              {!preferenceId ? (
              <button type="submit" className="pay-button">IR A PAGAR</button>
              ) : <div id="wallet_container" className="paybutton"></div>}
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
    </div>
  );
}

export default ConfirmOrder;

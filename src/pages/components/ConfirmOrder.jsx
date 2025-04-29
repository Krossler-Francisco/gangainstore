import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./ConfirmOrder.css";
import { FiShoppingCart, FiTruck, FiCreditCard, FiMapPin } from "react-icons/fi";
import { getShippingPriceByZipcode } from "../../utils/shipping";
import SimularWebhookPago from "./SimularWebhookPago";

function ConfirmOrder() {
  const mp = window.MercadoPago && new window.MercadoPago('APP_USR-4f89bd10-10f6-4b81-a3e9-abaed15c4452');
  const { cart, clearCart } = useCart();
  const [orderSaveError, setOrderSaveError] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(null);
  const location = useLocation();
  const [preferenceId, setPreferenceId] = useState(null);
  const [step, setStep] = useState(1);
  const [zipcode, setZipcode] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('status');
    const paymentId = queryParams.get('payment_id');

    if (paymentStatus && paymentId) {
      if (paymentStatus === 'approved') {
        setStep(4);
        clearCart();
      } else {
        setStep(3);
      }
    }
  }, [location.search, clearCart]);

  useEffect(() => {
    const newTotal = cart.reduce((total, item) => total + (item.desconto * item.quantity), 0) + (shippingPrice || 0);
    setTotal(newTotal);
  }, [cart, shippingPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep(2);

    const formData = new FormData(e.target);
    const cliente = Object.fromEntries(formData.entries());
    const productos = cart;
    const safeShippingPrice = typeof shippingPrice === "number" ? shippingPrice : 0;


    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente,
          productos,
          total: {
            shippingPrice: safeShippingPrice || 0,
            couponDiscount: 0,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setOrderSaveError(true);
        alert(`Error en checkout: ${data.error}`);
        return;
      }

      setPreferenceId(data.preferenceId);
      setStep(3);
    } catch (error) {
      console.error('Error en checkout:', error);
      setOrderSaveError(true);
    }
  };

  useEffect(() => {
    if (preferenceId && mp) {
      const walletContainer = document.getElementById('wallet_container');

      if (walletContainer && walletContainer.children.length === 0) {
        mp.checkout({
          preference: { id: preferenceId },
          render: { container: '#wallet_container', label: 'PAGAR CON MERCADO PAGO' },
          customization: {
            visual: {
              buttonBackground: '#0e0e0e',
              buttonText: 'white',
              borderRadius: '6px',
              verticalPadding: '1rem',
              horizontalPadding: '1rem',
              marginTop: '1rem',
              fontSize: '14px',
            },
          },
        });
      }
    }
  }, [preferenceId, mp]);

  const searchAddress = (e) => {
    e.preventDefault();
    const { price } = getShippingPriceByZipcode(zipcode);
    setShippingPrice(price);
  };

  return (
    <div className="success-container-landing">
      <div className="steps-container">
        {/* Steps visuales */}
        <div className="step-item-container">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
            <FiShoppingCart className="step-cart" size={10} />
          </div>
          <p>Carrito</p>
        </div>
        <div className={`step-divider ${step >= 1 ? 'active' : ''}`} />
        <div className="step-item-container">
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
            <FiTruck className="step-cart" size={10} />
          </div>
          <p>Entrega</p>
        </div>
        <div className={`step-divider ${step >= 2 ? 'active' : ''}`} />
        <div className="step-item-container">
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
            <FiCreditCard className="step-cart" size={10} />
          </div>
          <p>Pago</p>
        </div>
      </div>

      <h2>Completa tus datos para finalizar la compra</h2>
      <div className="success-container">
        <section className="success-content">
          <div className="success-form-box">
            <form onSubmit={handleSubmit}>
              {/* Formulario */}
              <div className="success-form-group">
                <input className="no-margin" type="text" name="fullname" required placeholder="Nombre y apellido *" />
              </div>
              <div className="success-form-group">
                <input type="email" name="email" required placeholder="Email *" />
              </div>
              <div className="success-form-group">
                <input type="tel" name="phone" required placeholder="Teléfono *" />
              </div>
              <div className="success-form-group">
                <input type="text" name="dni" required placeholder="DNI *" />
              </div>
              <div className="success-form-group">
                <input type="text" name="street" required placeholder="Calle *" />
              </div>
              <div className="success-form-group">
                <input type="text" name="city" required placeholder="Ciudad *" />
              </div>
              <div className="success-form-group">
                <input type="text" name="province" required placeholder="Provincia *" />
              </div>
              <div className="success-form-group">
                <div className="zip-container">
                  <input
                    type="text"
                    name="zipcode"
                    required
                    placeholder="Código Postal *"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                  <button className="zip-search" onClick={searchAddress}>
                    <p className="shipping-price">
                      {typeof shippingPrice === "number" ? `$${shippingPrice.toFixed(2)}` : "Consultar"}
                    </p>
                    <FiMapPin color="#666" size={14} />
                  </button>                  
                </div>
              </div>
              <div className="success-form-group">
                <textarea name="details" rows="4" placeholder="Detalles adicionales (Departamento, piso, referencias...)" />
              </div>
              <SimularWebhookPago />
              {!preferenceId && (
                <button type="submit" className="pay-button">CONFIRMAR DATOS</button>
              )}
              <div id="wallet_container"></div>
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
                    <p>Precio: ${Number(item.desconto).toFixed(2)}</p>
                    <p>Total: ${(item.desconto * item.quantity).toFixed(2)}</p>
                    <p className="shipping-price">Envío: $
                      {typeof shippingPrice === "number" ? `${shippingPrice.toFixed(2)}` : "Consultar"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <strong>
                Total: ${total.toFixed(2)}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ConfirmOrder;

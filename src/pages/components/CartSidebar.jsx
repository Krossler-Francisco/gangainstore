import './CartSidebar.css';
import { FiTrash } from "react-icons/fi";
import { useCart } from '../../hooks/useCart';
import { useEffect, useRef, useState } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-4f89bd10-10f6-4b81-a3e9-abaed15c4452'); // Reemplaza con tu clave pública real

function CartSidebar({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const sidebarRef = useRef(null);

  // 💡 Detectar clics fuera del carrito
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose(); // 👉 cerrar el carrito
      }
    };
  
    const isMobile = window.innerWidth <= 768;
  
    if (isOpen && isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      if (isMobile) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isOpen, onClose]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const items = cart.map(item => ({
      title: item.name,
      unit_price: Number(item.price),
      quantity: item.quantity,
    }));

    try {
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.preferenceId) {
        setPreferenceId(data.preferenceId);
      } else {
        alert('No se pudo iniciar el pago');
      }
    } catch (error) {
      console.error(error);
      alert('Error al procesar el pago');
    }
  };

  return (
    <div className={`cart-sidebar-overlay ${isOpen ? 'visible' : ''}`}>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="cart-header">
          <h2 className='cart-title'>Carrito De Compras</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}`} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="item-details">
                  <p>{item.name}</p>
                  <p>${Number(item.price)}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <FiTrash size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span>Total:</span>
            <span>${cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toLocaleString('es-AR')}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            FINALIZAR PEDIDO
          </button>

          {preferenceId && (
            <div className="mercado-pago-wallet">
              <h3 className='signal'>Completa tu compra con Mercado Pago</h3>
              <h3 className='validate-signal'>
                Después de pagar, no te olvides de llenar los datos de envío para que podamos procesar tu pedido.
              </h3>
              <div className="wallet-box">
                <Wallet initialization={{ preferenceId }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;

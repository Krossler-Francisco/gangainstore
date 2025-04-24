import './CartSidebar.css';
import { FiTrash } from "react-icons/fi";
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-4f89bd10-10f6-4b81-a3e9-abaed15c4452');

function CartSidebar({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [step, setStep] = useState('cart'); // 'cart' | 'confirm' | 'pay'

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  const handleGeneratePreference = async () => {
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
        setStep('pay');
      } else {
        alert('No se pudo iniciar el pago');
      }
    } catch (error) {
      console.error(error);
      alert('Error al procesar el pago');
    }
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2 className='cart-title'>
          {step === 'cart' && 'Carrito De Compras'}
          {step === 'confirm' && 'Confirmar Datos'}
          {step === 'pay' && 'Finalizar Compra'}
        </h2>
        <button className="close-btn" onClick={() => {
          setStep('cart');
          onClose();
        }}>×</button>
      </div>

      {step === 'cart' && (
        <div className="cart-content">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
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
      )}

      {step === 'confirm' && (
        <div className="confirmation-content">
          <p><strong>Total a pagar:</strong> ${total.toLocaleString('es-AR')}</p>
          <p>¿Estás seguro de que querés proceder al pago?</p>
          <button className="checkout-btn" onClick={handleGeneratePreference}>Sí, continuar al pago</button>
          <button className="cancel-btn" onClick={() => setStep('cart')}>Volver</button>
        </div>
      )}

      {step === 'pay' && preferenceId && (
        <div className="mercado-pago-wallet">
          <h3>Completa tu compra con Mercado Pago</h3>
          <div className="wallet-box">
            <Wallet initialization={{ preferenceId }} />
          </div>
        </div>
      )}

      {step === 'cart' && (
        <div className="cart-footer">
          <div className="total-row">
            <span>Total:</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
          <button className="checkout-btn" onClick={() => setStep('confirm')}>
            FINALIZAR PEDIDO
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;

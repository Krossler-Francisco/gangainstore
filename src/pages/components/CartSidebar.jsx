import './CartSidebar.css';
import { FiTrash } from "react-icons/fi";
import { useCart } from '../../hooks/useCart';
import { useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';


function CartSidebar({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const goToConfirmOrder = () => {
    if (cart.length === 0) return;
    navigate('/confirm-order');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
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
                  <p>${Number(item.desconto)}</p>
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
        <span>${cart.reduce((sum, item) => sum + (Number(item.desconto) * item.quantity), 0).toLocaleString('es-AR')}</span>
      </div>
      <button
        className={`checkout-btn ${cart.length > 0 ? '' : 'disabled-btn'}`}
        onClick={goToConfirmOrder}
      >
        FINALIZAR COMPRA
      </button>
    </div>
      </div>
    </div>
  );
}

export default CartSidebar;

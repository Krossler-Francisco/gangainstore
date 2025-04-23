import './CartSidebar.css';
import { FiTrash } from "react-icons/fi";
import { useCart } from '../../hooks/useCart';

function CartSidebar({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
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
                <p>${item.price}</p>
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
                <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('es-AR')}</span>
            </div>
            <button className="checkout-btn">FINALIZAR PEDIDO</button>
        </div>
    </div>
  );
}

export default CartSidebar;

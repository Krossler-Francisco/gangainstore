import "./Success.css";

function TestComponent() {

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const confirmedOrder = [
        {
          id: "lamp-20",
          name: "Lámpara de papel 20cm",
          price: 1200,
          quantity: 2,
          img: "https://res.cloudinary.com/dwnf4oghd/image/upload/v1745434546/cld-sample-3.jpg"
        },
        {
          id: "lamp-40",
          name: "Lámpara de papel 40cm",
          price: 2000,
          quantity: 1,
          img: "https://res.cloudinary.com/dwnf4oghd/image/upload/v1745434546/cld-sample-3.jpg"
        },
        {
          id: "lamp-60",
          name: "Lámpara de papel 60cm",
          price: 3000,
          quantity: 3,
          img: "https://res.cloudinary.com/dwnf4oghd/image/upload/v1745434546/cld-sample-3.jpg"
        }
      ];

  return (
    <div className="success-container-landing">
        <h2>¡Gracias por tu compra!</h2>
        <div className="success-container">
        <section className="success-content">
            <div className="success-form-box">
            <p>Por favor, completa tus datos de envío para finalizar el pedido.</p>
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
                <button type="submit">Enviar</button>
            </form>
            </div>
        </section>
        <section className="success-content">
            <div className="success-form-box">
                <p>Resumen del pedido:</p>
                <ul className="order-summary">
                {confirmedOrder.map((item) => (
                    <li key={item.id} className="order-item">
                    <img src={item.img} alt={item.name} className="order-img" />
                    <div className="order-details">
                        <p><strong>{item.name}</strong></p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio unitario: ${Number(item.price).toFixed(2)}</p>
                        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    </li>
                ))}
                </ul>
                <div className="total-price">
                <strong>Total: ${confirmedOrder.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong>
                </div>
            </div>
        </section>
        </div>
    </div>
  );
}

export default TestComponent;

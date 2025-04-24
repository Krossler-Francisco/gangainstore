import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Success.css";

function Success() {
  const [searchParams] = useSearchParams();
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const paymentId = searchParams.get("payment_id");

  const Success = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
    };

  useEffect(() => {
    async function validatePayment() {
      try {
        const response = await fetch(`/api/validate_payment?payment_id=${paymentId}`);
        const data = await response.json();

        if (data.valid) {
          setIsPaymentApproved(true);
        }
      } catch (err) {
        console.error("Error validando pago:", err);
      } finally {
        setLoading(false);
      }
    }

    if (paymentId) {
      validatePayment();
    } else {
      setLoading(false);
    }
  }, [paymentId]);

  if (loading) return <div>Cargando...</div>;

  if (!isPaymentApproved) {
    return <div>El pago no fue validado. Por favor intenta nuevamente o contáctanos.</div>;
  }

  return (
    <div className="success-container">
      <section className="success-content">
        <div className="success-form-box">
          <h2>¡Gracias por tu compra!</h2>
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
    </div>
  );
}

export default Success;

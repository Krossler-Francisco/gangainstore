import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const paymentId = searchParams.get("payment_id");

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
    <div className="checkout-container">
      <h2>Gracias por tu compra!</h2>
      <p>Por favor, completa tus datos de envío para finalizar el pedido.</p>
      <form>
        <label>
          Nombre completo:
          <input type="text" name="name" required />
        </label>
        <label>
          Dirección:
          <input type="text" name="address" required />
        </label>
        <label>
          Número de contacto:
          <input type="tel" name="phone" required />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Success;

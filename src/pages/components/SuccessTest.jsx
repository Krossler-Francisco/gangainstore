import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // o "next/navigation" si usás Next.js

function Success() {
  const [searchParams] = useSearchParams();
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");

  useEffect(() => {
    // Simulamos validación básica
    if (status === "approved" && paymentId && externalReference) {
      // Aquí podrías hacer una verificación real con tu backend
      setIsPaymentApproved(true);
    }

    setLoading(false);
  }, [status, paymentId, externalReference]);

  if (loading) return <div>Cargando...</div>;

  if (!isPaymentApproved) {
    return <div>El pago no fue aprobado o faltan datos. Por favor intenta nuevamente.</div>;
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
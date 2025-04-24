// src/pages/CheckoutPage.jsx
import { useEffect } from 'react';

function CheckoutPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = "TU_PREFERENCE_ID"; // Reemplazá con tu preference_id real
    script.dataset.buttonLabel = "Pagar con Mercado Pago";
    document.getElementById("wallet_container").appendChild(script);
  }, []);

  return (
    <div className="checkout-container">
      <h2>Confirmación de Compra</h2>
      <p>Revisá tus datos y finalizá el pago:</p>
      <div id="wallet_container" />
    </div>
  );
}

export default CheckoutPage;

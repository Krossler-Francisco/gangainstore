import React, { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './Span.css';

initMercadoPago('APP_USR-4f89bd10-10f6-4b81-a3e9-abaed15c4452'); // substitua pela sua public key real

function Span() {
  const [preferenceId, setPreferenceId] = useState(null);

  const handleBuyClick = async () => {
    try {
      const payload = {
        items: [
          {
            title: 'Compra destacada',
            unit_price: 200,
            quantity: 1,
          },
        ],
      };

      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.preferenceId) {
        setPreferenceId(data.preferenceId); // Agora estamos usando "preferenceId"
      } else {
        alert('No se pudo iniciar el pago');
      }
    } catch (err) {
      console.error(err);
      alert('Error al procesar el pago');
    }
  };

  return (
    <div className="span_container">
      <strong className="span_content">
        Envío gratis en compras superiores a $200.000
      </strong>
      <button onClick={handleBuyClick}>Comprar</button>

      {preferenceId && (
        <div style={{ marginTop: '20px', width: '300px' }}>
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}

export default Span;

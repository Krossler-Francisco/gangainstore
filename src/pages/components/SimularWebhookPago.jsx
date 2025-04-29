import React from 'react';

const SimularWebhookPago = () => {
  const handleSimularPago = async () => {
    try {
      const payload = {
        type: 'payment',
        data: {
          id: 'fake-payment-id-123',  // Este puede ser cualquier cosa
          external_reference: '681011c7d63172082f14bb75' // <<< ESTE es el _id real de tu venta
        }
      };

      const response = await fetch('https://www.gangain.com.ar/api/webhooktesting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      console.log('Respuesta del webhook:', result);
      alert('Webhook simulado enviado correctamente.');
    } catch (error) {
      console.error('Error enviando webhook simulado:', error);
      alert('Error al enviar webhook simulado.');
    }
  };

  return (
    <div>
      <button 
        onClick={handleSimularPago} 
        style={{
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Simular Webhook de Pago Aprobado
      </button>
    </div>
  );
};

export default SimularWebhookPago;

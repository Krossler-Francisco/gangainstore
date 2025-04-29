import React from 'react';

const SimularWebhookPago = () => {
  const handleSimularPago = async () => {
    try {
      const payload = {
        action: 'payment.created',
        api_version: 'v1',
        data: {
          id: 'fake-payment-id-123', // Puede ser cualquier string, solo lo necesita para hacer el GET (simulado)
        },
        date_created: new Date().toISOString(),
        id: Math.floor(Math.random() * 1000000000), // ID de notificación simulada
        live_mode: false,
        type: 'payment',
        user_id: 'fake-user-id-123'
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

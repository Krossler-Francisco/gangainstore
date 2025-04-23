import './Span.css'

function Span() {
  const handleBuyClick = async () => {
    try {
      const payload = {
        items: 
          {
            title: 'Compra destacada',
            unit_price: 200,
            quantity: 1,
          },
        
      };
  
      // Log para verificar o payload antes de enviar
      console.log('Payload enviado:', JSON.stringify(payload));
  
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  // Enviando com a estrutura correta
      });
  
      const data = await res.json();
  
      if (data.init_point) {
        window.location.href = data.init_point; // Redireciona ao checkout
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
    </div>
  );
}

export default Span;

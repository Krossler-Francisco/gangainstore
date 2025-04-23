import './Span.css'

function Span() {
  const handleBuyClick = async () => {
    try {
      const payload = {
        title: 'Compra destacada',
        unit_price: 20000,
        quantity: 1,
      };
  
      console.log('Corpo da requisição:', JSON.stringify(payload));  // Verifique a saída
  
      const res = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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

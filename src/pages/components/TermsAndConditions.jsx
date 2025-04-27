import React from 'react';
import './TermsAndConditions.css';

export default function TermsAndConditions() {
  return (
    <div className="terms-conditions">
      <h1 className="terms-title">Términos y Condiciones</h1>

      <p className="terms-text">Bienvenido a <strong>gangain</strong>. Al utilizar nuestro sitio web y servicios, usted acepta los siguientes términos y condiciones:</p>

      <h2 className="terms-subtitle">1. Productos ofrecidos</h2>
      <p className="terms-text">Vendemos productos para el hogar, con un enfoque especial en lámparas chinas y pantallas decorativas que complementan la iluminación de ambientes.</p>

      <h2 className="terms-subtitle">2. Ámbito de operación</h2>
      <p className="terms-text">Actualmente operamos exclusivamente en la República Argentina.</p>

      <h2 className="terms-subtitle">3. Disponibilidad de productos</h2>
      <p className="terms-text">En caso de falta de stock, nos comunicaremos con el cliente para ofrecer una prórroga en la entrega o la devolución inmediata del dinero, según la decisión del comprador, una vez informado el tiempo estimado de reposición (generalmente de 2 días).</p>

      <h2 className="terms-subtitle">4. Cancelaciones y devoluciones</h2>
        <p className='terms-text'>Se puede cancelar una compra en cualquier momento antes de su despacho.</p>
        <p className='terms-text'>Para devoluciones, retiramos el producto en la puerta del cliente y realizamos la devolución del dinero de forma inmediata al momento de retirar el producto.</p>

      <h2 className="terms-subtitle">5. Envíos</h2>
      <p className="terms-text">Los envíos se realizan mediante logística tercerizada y son entregados en el día o al día siguiente, según la hora de la compra (después de las 12:00 hs se despacha al día siguiente). Solo entregamos en Capital Federal y Gran Buenos Aires.</p>
      <p className="terms-text">En caso de daños o pérdida de mercadería, asumimos la responsabilidad correspondiente.</p>

      <h2 className="terms-subtitle">6. Medios de pago</h2>
      <p className="terms-text">El pago se realiza principalmente a través de CheckoutPRO de Mercado Pago. Para otros medios, puede contactarse con un vendedor mediante WhatsApp, email o Instagram.</p>

      <h2 className="terms-subtitle">7. Política de precios</h2>
      <p className="terms-text">Los cambios de precios se realizan de forma esporádica. Para cancelaciones, anulaciones o devoluciones, se aplicará el precio vigente al momento de la compra.</p>

      <h2 className="terms-subtitle">8. Propiedad del contenido</h2>
      <p className="terms-text">Algunos productos o contenidos exhibidos pueden pertenecer a terceros. Nos limitamos a su comercialización o difusión según corresponda.</p>

      <h2 className="terms-subtitle">9. Actualización de términos</h2>
      <p className="terms-text">Recomendamos revisar periódicamente estos términos y condiciones, ya que pueden ser modificados sin previo aviso.</p>

      <h2 className="terms-subtitle">10. Legislación aplicable</h2>
      <p className="terms-text">Estos términos se rigen por las leyes vigentes en la República Argentina y nuestro sitio está destinado a clientes residentes en el país.</p>

      <p className="terms-update"><small>Última actualización: Abril 2025</small></p>
    </div>
  );
}

import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h1 className="privacy-title">Política de Privacidad</h1>

      <p className="privacy-text">En <strong>gangain</strong> valoramos y protegemos la privacidad de nuestros usuarios. Esta política explica cómo recopilamos, utilizamos y protegemos su información personal.</p>

      <h2 className="privacy-subtitle">Información que recopilamos</h2>
      <p className="privacy-text">Recopilamos los siguientes datos personales cuando realiza una compra o se registra en nuestro sitio:</p>
      <ul className="privacy-list">
        <li>Nombre de usuario</li>
        <li>Email</li>
        <li>Dirección de envío</li>
        <li>Número para contacto</li>
        <li>Fechas de compras</li>
      </ul>

      <h2 className="privacy-subtitle">Uso de la información</h2>
      <p className="privacy-text">Utilizamos la información recopilada para:</p>
      <ul className="privacy-list">
        <li>Procesar pedidos</li>
        <li>Atender consultas y brindar servicio al cliente</li>
      </ul>

      <h2 className="privacy-subtitle">Seguimiento y análisis</h2>
      <p className="privacy-text">Utilizamos Vercel Analytics para realizar el seguimiento de visitas y analizar el uso del sitio web.</p>

      <h2 className="privacy-subtitle">Compartición de datos</h2>
      <p className="privacy-text">Compartimos datos de visita de la página con Vercel Analytics. Los datos de envío se mantienen seguros y únicamente dentro de nuestra empresa.</p>

      <h2 className="privacy-subtitle">Métodos de pago</h2>
      <p className="privacy-text">Los pagos en nuestro sitio se realizan a través de <strong>CheckoutPRO</strong>, la solución de pasarela de pagos de <strong>Mercado Pago</strong>. Esta plataforma permite procesar pagos de forma segura mediante tarjetas de crédito, débito, transferencias y otros medios electrónicos, garantizando la protección de los datos financieros mediante encriptación avanzada. De este modo, sus transacciones son confidenciales, seguras y están protegidas conforme a los más altos estándares de seguridad del mercado.</p>

      <h2 className="privacy-subtitle">Derechos del usuario</h2>
      <p className="privacy-text">Usted tiene derecho a:</p>
      <ul className="privacy-list">
        <li>Solicitar la cancelación de su cuenta</li>
        <li>Acceder a su historial de pedidos</li>
        <li>Contactarse con nosotros para cualquier consulta sobre su información personal</li>
      </ul>

      <h2 className="privacy-subtitle">Contacto</h2>
      <p className="privacy-text">Para consultas relacionadas con su privacidad, puede contactarnos en: <a href="mailto:krosslerfrancisco@gmail.com">krosslerfrancisco@gmail.com</a>.</p>

      <p className="privacy-text"><em>Ubicación: Av Federico Lacroze 2520 6A, Capital Federal, Buenos Aires, Argentina.</em></p>

      <p className="privacy-update"><small>Última actualización: Abril 2025</small></p>
    </div>
  );
}

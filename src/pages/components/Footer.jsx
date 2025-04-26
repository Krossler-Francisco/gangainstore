import { Link } from 'react-router-dom';
import { FaInstagram, FaHome } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
            <h3 className='footer-link'>Redes Sociales</h3>
          <div className="footer-icon-link">
            <a href="https://instagram.com/gangain_ar" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          </div>
          <div className="footer-icon-link">
            <a href="https://gangain.com.ar/" target="_blank" rel="noopener noreferrer" className="footer-link">Home Page</a>
          </div>
          <div className="footer-icon-link">
            <a href="https://mercadolibre.com.ar/" target="_blank" rel="noopener noreferrer" className="footer-link">Mercado Libre</a>
          </div>
          <div className="footer-icon-link">
            <a href="https://atom.bio/gangain_ar" target="_blank" rel="noopener noreferrer" className="footer-link">Links</a>
          </div>
        </div>
        <div className="footer-column">
        <h3 className='footer-link'>Pagina Web</h3>
          <a href="/" className="footer-link">Home</a>
          <a href="/about" className="footer-link">Nosotros</a>
          <a href="/payment" className="footer-link">Medios de Pago</a>
          <a href="/mayoristas" className="footer-link">Mayoristas</a>
          <a href="/envios" className="footer-link">Envíos</a>
        </div>

        {/* Segunda columna: Redes Sociales */}

        {/* Tercera columna: Legales */}
        <div className="footer-column">
            <h3 className='footer-link'>Legales</h3>
          <Link to="/privacy" className="footer-link">Política de Privacidad</Link>
          <Link to="/terms" className="footer-link">Términos y Condiciones</Link>
          <Link target="_blank" to="/sitemap.xml" className="footer-link">Sitemap</Link>
        </div>

      </div>
    </footer>
  );
}

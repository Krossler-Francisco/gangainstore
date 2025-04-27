import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Span.css';

function Span() {
  return (
    <div className="span_container">
      <div className="span_content">
        <a href='https://instagram.com/gangain_ar/' target='_blank' className="span_icon">
          <FaInstagram />
        </a>
        <a href='https://wa.me/5491134732744?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n' target='_blank' className="span_icon">
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}

export default Span;

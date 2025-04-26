import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Span.css';

function Span() {
  return (
    <div className="span_container">
      <div className="span_content">
        <Link to="/instagram" className="span_icon">
          <FaInstagram />
        </Link>
        <Link to="/whatsapp" className="span_icon">
          <FaWhatsapp />
        </Link>
      </div>
    </div>
  );
}

export default Span;

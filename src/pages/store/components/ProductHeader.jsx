import { SlidersHorizontal } from 'lucide-react';
import './ProductHeader.css';

export default function ProductHeader( {count}) {

  return (
    <section className='product-header-container'>
        <h1 className='product-title'>Productos</h1>
        <div className="product-header">
        <div className='product-select'>
            <button className="filter-button">
                <SlidersHorizontal className="filter-icon" />
                <span>Filtrar</span>
            </button>
        </div>

        <span className="product-count">{count} artículos</span>
        <div className='aling-final product-select'>
            <select className=" sort-select">
                <option value="mas-vendidos">Más vendidos</option>
                <option value="precio-mayor">Mayor precio</option>
                <option value="precio-menor">Menor precio</option>
                <option value="nombre">A-Z</option>
            </select>
        </div>
        </div>
    </section>
  );
}

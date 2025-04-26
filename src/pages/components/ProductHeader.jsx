import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import './ProductHeader.css';

export default function ProductHeader({ count, filters, setFilters }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const filtrosActivos = [];

  if (filters.search) filtrosActivos.push(`Nombre: "${filters.search}"`);
  if (filters.stock === "con-stock") filtrosActivos.push("Con stock");
  if (filters.stock === "sin-stock") filtrosActivos.push("Sin stock");
  if (filters.minPrice) filtrosActivos.push(`Precio minimo $${filters.minPrice}`);
  if (filters.maxPrice) filtrosActivos.push(`Precio maximo $${filters.maxPrice}`);

  return (
    <>
      <section className='product-header-container'>
        <h1 className='product-title'>Productos</h1>
        <div className="product-header">
          <div className='product-select'>
            <button className="filter-button" onClick={(!showSidebar) ? () => setShowSidebar(true) : () => setShowSidebar(false)}>
              <SlidersHorizontal className="filter-icon" />
              <span>Filtrar</span>
            </button>
          </div>

          <div className='product-count-container'>
            <span className="product-count">{count} artículos</span>
            {filtrosActivos.length > 0 && (
              <span className="active-filters">Filtros: {filtrosActivos.join(" | ")}</span>
            )}
          </div>


          <div className='aling-final product-select'>
            <select
              className="sort-select"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="mas-vendidos">Más vendidos</option>
              <option value="precio-mayor">Mayor precio</option>
              <option value="precio-menor">Menor precio</option>
            </select>
          </div>
        </div>
      </section>

      <FilterSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}

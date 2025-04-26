import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import './ProductHeader.css';

export default function ProductHeader({ count, filters, setFilters }) {
  const [showSidebar, setShowSidebar] = useState(false);

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

          <span className="product-count">{count} artículos</span>

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

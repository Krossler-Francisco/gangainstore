import { useEffect, useState } from "react";
import "./FilterSidebar.css";

export default function FilterSidebar({ isOpen, onClose, filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  // Mantener sincronizado localFilters cuando se abren los filtros
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const clearFilters = () => {
    setFilters([]);
    onClose();
  };

  return (
    <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <div className="filter-header">
        <h2>Filtros</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="filter-section">
        <label>Rango de precio</label>
        <input
          type="number"
          name="minPrice"
          placeholder="Mín"
          value={localFilters.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Máx"
          value={localFilters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <div className="filter-section">
        <label>Stock</label>
        <select name="stock" value={localFilters.stock} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="con-stock">Disponible</option>
          <option value="sin-stock">Agotado</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Altura mínima (cm)</label>
        <input
          type="number"
          name="minAltura"
          placeholder="Ej: 20"
          value={localFilters.minAltura}
          onChange={handleChange}
        />
      </div>

      <div className="filter-section">
        <label>Ancho mínimo (cm)</label>
        <input
          type="number"
          name="minAncho"
          placeholder="Ej: 20"
          value={localFilters.minAncho}
          onChange={handleChange}
        />
      </div>

      <div className="filter-section">
        <label>
          <input
            type="checkbox"
            name="frete"
            checked={localFilters.frete}
            onChange={handleChange}
          />
          Envío gratis
        </label>
      </div>

      <div className="filter-section">
        <button className="apply-button" onClick={applyFilters}>
          Aplicar filtros
        </button>
        <button className="apply-button" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

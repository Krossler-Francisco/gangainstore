import React, { useEffect, useRef, useState } from 'react';
import data from '../store/data/products.json';
import "./Product.css";
import { Link } from 'react-router-dom';

function Product({ filters, onCountChange }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, []);

  const filteredProjects = projects
  .filter(project => {
    // Filtro por nombre
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    // Filtro por stock
    if (filters.stock === "con-stock" && project.stock === 0) return false;
    if (filters.stock === "sin-stock" && project.stock > 0) return false;

    // Filtro por precio mínimo
    if (filters.minPrice && parseFloat(project.price) < parseFloat(filters.minPrice)) return false;

    // Filtro por precio máximo
    if (filters.maxPrice && parseFloat(project.price) > parseFloat(filters.maxPrice)) return false;

    return true;
  })
  .sort((a, b) => {
    // Ordenamiento
    if (filters.sort === "precio-mayor") return b.price - a.price;
    if (filters.sort === "precio-menor") return a.price - b.price;
    if (filters.sort === "mas-vendidos") return b.vendas - a.vendas;
    if (filters.sort === "nombre") return a.name.localeCompare(b.name);
    if (filters.sort === "descuento") return (b.desconto ?? 0) - (a.desconto ?? 0);
    return 0; // sin orden
  });


  useEffect(() => {
    onCountChange && onCountChange(filteredProjects.length);
  }, [filteredProjects, onCountChange]);

  return (
    <div className="product_list_container">
      {filteredProjects.map((project) => (
        <ProductCard key={project._id} project={project} />
      ))}
    </div>
  );
}

function ProductCard({ project }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // só ativa uma vez
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      to={`/product/${project._id}`}
      className={`product ${isVisible ? "visible" : ""}`}
    >
      <div className="image-wrapper">
        {project.frete === true && (
          <p className='product-porcentagem'>frete gratis</p>
        )}
        {project.stock == 0 && (
          <p className='product-stock'>AGOTADO</p>
        )}
        <img className="product-image img1" src={project.img1} alt={project.name} />
        <img className="product-image img2" src={project.img2} alt={project.name} />
      </div>
      <div className='product-info'>
        <p className='info product-name'>{project.name}</p>
        <p className='info product-price'>${project.price}</p>
        <p className='info product-desconto'>${project.desconto} <span className='transferencia'></span></p>
        <p className='info product-disponible'><span className='span-disponible'>Disponibles: </span>{project.stock}</p>
      </div>
    </Link>
  );
}


export default Product;

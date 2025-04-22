import React, { useEffect, useRef, useState } from 'react';
import data from '../data/products.json';
import "./product.css";
import { Link } from 'react-router-dom';

function Product({ searchTerm, onCountChange }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {project.porcentagem > 0 && (
          <p className='product-porcentagem'>{project.porcentagem}%</p>
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
        <p className='info product-desconto'>${project.desconto} <span className='transferencia'>con transferencia</span></p>
        <p className='info product-disponible'><span className='span-disponible'>Disponibles: </span>{project.stock}</p>
      </div>
    </Link>
  );
}


export default Product;

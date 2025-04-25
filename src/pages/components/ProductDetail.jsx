import data from '../store/data/products.json';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-hot-toast';

import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = data.find(item => item._id === id);
  const [selectedImage, setSelectedImage] = useState(product?.img1 || '');
  const { addToCart, setShowCart  } = useCart();

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };


  const handleAddToCart = () => {
    const productToAdd = {
      id: product._id,
      name: product.name,
      price: Number(product.price),
      desconto: Number(product.desconto),
      img: product.img1,
      quantity: 1,
    };

  
    addToCart(productToAdd);
    
    toast.success(`${product.name} adicionado ao carrinho!`);

  };

  const images = [product?.img1, product?.img2, product?.img3, product?.img4].filter(Boolean);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-images">
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              className={selectedImage === img ? 'active' : ''}
              onClick={() => handleImageClick(img)}
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
            />
          ))}
        </div>
        <div className="main-image">
        <AnimatePresence mode="wait">
            <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                initial={{ opacity: .5, scale: .97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25}}
                className="main-image-element"
            />
        </AnimatePresence>
        </div>
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
            <p className="sku">STOCK: {product.stock}</p>
        <p className="price">${product.price.toLocaleString('es-AR')}</p>
          <p className="price-transfer">
            ${product.desconto.toLocaleString('es-AR')} <span>con transferencia</span>
          </p>
        <div className="price-transfer-line">
        <p className='price-sin-impuesto'>
            <span>Precio sin impuestos nacionales</span> ${product.sinImpuesto} 
        </p>
        </div>

        <button
          className="add-to-cart"
          onClick={() => {
            handleAddToCart();
            setShowCart(true);
          }}
        >
          Agregar al carrito
        </button>

        {product.frete && (
          <p className="frete"><FaTruck /> Envío a todo el país</p>
        )}


        <div className="details">
          <p className='details-title'>Detalles:</p>
          <p>Altura: {product.details.altura}cm</p>
          <p>Ancho: {product.details.ancho}cm</p>
          <p>Ancho Cerrado: {product.details.anchoCerrada}cm</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

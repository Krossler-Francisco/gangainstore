import { useEffect, useState } from "react";
import Product from "../components/Product";
import "./Store.css";
import { Link } from "react-router-dom";
import ProductHeader from "../components/ProductHeader";

function Store({ searchTerm }) {
  const [hideHeader, setHideHeader] = useState(false);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setHideHeader(Boolean(searchTerm));
  }, [searchTerm]);

  return (
    <div className="store-container">
      <header className={`store-header ${hideHeader ? "hide-header" : ""}`}>
        <div className="store-header-content">
          <h1>Nuevo Ingreso!</h1>
          <h2>Lampara de papel China 75cm</h2>
          <Link className="store-header-button" to="">Comprar</Link>
        </div>
      </header>

      <ProductHeader count={productCount} />
      
      <main className="store-main">
        <section className="product-list">
          <Product searchTerm={searchTerm} onCountChange={setProductCount} />
        </section>
      </main>

      <footer className="store-footer"></footer>
    </div>
  );
}

export default Store;

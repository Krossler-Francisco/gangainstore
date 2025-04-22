import { useEffect, useState } from "react";
import Product from "./components/Product";
import "./Store.css";
import { Link } from "react-router-dom";
import ProductHeader from "./components/ProductHeader";

function Store({ searchTerm }) {
  const [hideHeader, setHideHeader] = useState(false);
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setHideHeader(Boolean(searchTerm));
  }, [searchTerm]);

  const handleTransitionEnd = () => {
    setDelayedSearchTerm(searchTerm);
    // Dá um tempo pequeno para aplicar a classe de "fade"
    setTimeout(() => setShowProducts(true), 10);
  };

  useEffect(() => {
    setShowProducts(true); // esconde antes da transição
  }, [searchTerm]);

  return (
    <div className="store-container">
      <header
        className={`store-header ${hideHeader ? "hide-header" : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="store-header-content">
          <h1>Nuevo Ingreso!</h1>
          <h2>Lampara de papel China 75cm</h2>
          <Link className="store-header-button" to="">Comprar</Link>
        </div>

      </header>
        <ProductHeader count={productCount}/>
      <main className="store-main">
        <section className={`product-list ${showProducts ? "visible" : ""}`}>
          <Product searchTerm={delayedSearchTerm} onCountChange={setProductCount} />
        </section>
      </main>

      <footer className="store-footer"></footer>
    </div>
  );
}

export default Store;

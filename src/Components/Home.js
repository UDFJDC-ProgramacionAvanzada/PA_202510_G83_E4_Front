import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import artesanos from "../Images/artesanos.png";
import "./Home.css";

function Home() {
  return (
    <section className="home" data-test-id="home-section">
      <div className="home-left">
        <div className="circulo-decorativo" data-test-id="decorative-circle"></div>
        <img 
          src={artesanos} 
          alt="Artesanos" 
          className="artesanos-img" 
          data-test-id="artesanos-image" 
        />
      </div>

      <div className="home-right">
        <h2 data-test-id="title">
          <FormattedMessage id="home.title" />{" "}
          <strong>Kapchy Market</strong>
        </h2>
        <p data-test-id="subtitle">
          <FormattedMessage id="home.subtitle" />
        </p>
        <p data-test-id="description">
          <FormattedMessage id="home.description" />
        </p>
        <div className="btns-container">
          <Link 
            to="/tienda" 
            className="btn-compra" 
            data-test-id="products-button"
          >
            <FormattedMessage id="home.button.products" />
          </Link>
          {/* Link to general registration */}
          <Link
            to="/registro"
            className="btn-compra"
            data-test-id="sell-button"
          >
            <FormattedMessage id="home.button.sell" />
          </Link>
          {/* Link to product specific registration */}
          <Link to="/registro-producto" className="btn-compra">
            Vender mis productos 
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
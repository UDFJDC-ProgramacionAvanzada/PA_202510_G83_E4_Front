import React from "react";
import { Link } from "react-router-dom"; // 👈 Importamos Link
import artesanos from "../Images/artesanos.png";
import "./Home.css";

function Home() {
  return (
    <section className="home">
      <div className="home-left">
        <div className="circulo-decorativo"></div>
        <img src={artesanos} alt="Artesanos" className="artesanos-img" />
      </div>

      <div className="home-right">
        <h2>¿Qué es <strong>Kapchy Market</strong>?</h2>
        <p>Es el puente entre el campo colombiano y tu hogar.</p>
        <p>
          Apoyamos a nuestros campesinos conectándolos directamente con quienes
          valoran sus productos únicos, naturales y llenos de historia.
        </p>
        <div className="btns-container">
          <Link to="/tienda" className="btn-compra">
            Ver los productos
          </Link>
          <Link to="/registro-producto" className="btn-compra">
            Vender mis productos  
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl"; // Importamos FormattedMessage
import "./Navbar.css";
import logo from "../Images/logo.png";
import iniciarSesion from "../Images/iniciarsesion.png";
import carrito from "../Images/Carrito.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Kapchy Market Logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/tienda">
              <FormattedMessage id="navbar.tienda" />
            </Link>
          </li>
          <li>
            <Link to="/productores">
              <FormattedMessage id="navbar.productores" />
            </Link>
          </li>
          <li>
            <Link to="/quienes-somos">
              <FormattedMessage id="navbar.quienesSomos" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={iniciarSesion} alt="Iniciar Sesión" className="icono-user" />
        {/* Prioritizing the internationalized login link */}
        <Link to="/login">
          <FormattedMessage id="navbar.iniciarSesion" />
        </Link>
        {/* Giving an option to use the new registration form, keeping internationalization */}
        <Link to="/formulario"> 
          <FormattedMessage id="navbar.registrarse" defaultMessage="Registrarse" />
        </Link>
        <Link to="/carrito">
          <img src={carrito} alt="Carrito de Compras" className="icono-carrito" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
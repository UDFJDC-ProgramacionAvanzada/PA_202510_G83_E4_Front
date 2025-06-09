import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Login.css";
import fondo from "../Images/login.png";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de inicio de sesión:", formData);
    // Aquí podrías agregar validaciones o conexión con backend
  };

  return (
    <div className="login-container">
      {/* Semicírculo de fondo */}
      <div className="semi-circulo"></div>

      <div className="login-form-wrapper">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <h2>
            <FormattedMessage id="login.titulo" defaultMessage="Iniciar Sesión" />
          </h2>

          <label htmlFor="username">
            <FormattedMessage id="login.usuario" defaultMessage="Nombre de usuario" />
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="contrasena">
            <FormattedMessage id="login.contrasena" defaultMessage="Contraseña" />
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />

          <button type="submit">
            <FormattedMessage id="login.boton" defaultMessage="Ingresar" />
          </button>
        </form>

        {/* Imagen lateral */}
        <div className="imagen-lateral">
          <img src={fondo} alt="Mujer indígena" />
        </div>
      </div>
    </div>
  );
}

export default Login;

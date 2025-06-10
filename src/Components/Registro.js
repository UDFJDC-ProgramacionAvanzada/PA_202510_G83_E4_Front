// src/Components/Registro.js
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "./Registro.css";
import fondo from "../Images/registro-mujer.webp";

function Registro() {
  const intl = useIntl();

  const [formData, setFormData] = useState({
    username: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    tipoUsuario: "",
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

    if (formData.contrasena !== formData.confirmarContrasena) {
      alert(
        intl.formatMessage({
          id: "registro.error.contrasena",
          defaultMessage: "Las contraseñas no coinciden",
        })
      );
      return;
    }

    console.log("Datos del formulario:", formData);
    // Aquí puedes redirigir o mostrar mensaje de éxito
  };

  return (
    <div className="registro-container">
      <div
        className="fondo-desenfocado"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>

      <div className="registro-right">
        <form onSubmit={handleSubmit} className="registro-form">
          <h2>
            <FormattedMessage id="registro.titulo" defaultMessage="Registrarse" />
          </h2>

          <label htmlFor="username">
            <FormattedMessage id="registro.usuario" defaultMessage="Nombre de usuario" />
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">
            <FormattedMessage id="registro.correo" defaultMessage="Correo" />
          </label>
          <input
            type="email"
            name="correo"
            id="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="contrasena">
            <FormattedMessage id="registro.contrasena" defaultMessage="Contraseña" />
          </label>
          <input
            type="password"
            name="contrasena"
            id="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmarContrasena">
            <FormattedMessage id="registro.confirmar" defaultMessage="Confirmar contraseña" />
          </label>
          <input
            type="password"
            name="confirmarContrasena"
            id="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            required
          />

          <label htmlFor="tipoUsuario">
            <FormattedMessage id="registro.tipoUsuario" defaultMessage="Tipo de usuario" />
          </label>
          <select
            name="tipoUsuario"
            id="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            required
          >
            <option value="">
              {intl.formatMessage({
                id: "registro.tipoUsuario.opcion",
                defaultMessage: "Seleccione una opción",
              })}
            </option>
            <option value="comprador">
              <FormattedMessage id="registro.tipoUsuario.comprador" defaultMessage="Comprador" />
            </option>
            <option value="vendedor">
              <FormattedMessage id="registro.tipoUsuario.vendedor" defaultMessage="Vendedor" />
            </option>
          </select>

          <button type="submit">
            <FormattedMessage id="registro.boton" defaultMessage="Registrarse" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;

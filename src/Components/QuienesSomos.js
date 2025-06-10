// src/Components/QuienesSomos.js
import React from "react";
import "./QuienesSomos.css";
import { FormattedMessage } from "react-intl";
import artesanosImg from "../Images/quienes_somos.jpg"; // Usa una imagen tuya aquí

function QuienesSomos() {
  return (
    <section className="quienes" data-test-id="quienes-section">
      <div className="quienes-left">
        <div className="circulo-decorativo"></div>
        <img
          src={artesanosImg}
          alt="Artesanos"
          className="quienes-img"
        />
      </div>

      <div className="quienes-right">
        <h2>
          <FormattedMessage id="quienes.titulo" defaultMessage="Nuestra Misión" />
        </h2>
        <p>
          <FormattedMessage
            id="quienes.descripcion1"
            defaultMessage="Kapchy Market nace para empoderar a los artesanos colombianos, facilitando la venta de sus productos auténticos en un mercado digital accesible y justo."
          />
        </p>

        <h3>
          <FormattedMessage id="quienes.vision" defaultMessage="Nuestra Visón" />
        </h3>
        <p>
          <FormattedMessage
            id="quienes.descripcion2"
            defaultMessage="Soñamos con una Colombia donde el trabajo artesanal tenga reconocimiento global, sin barreras tecnológicas ni de acceso."
          />
        </p>

        <h3>
          <FormattedMessage id="quienes.valores" defaultMessage="Nuestros Valores" />
        </h3>
        <ul>
          <li><FormattedMessage id="quienes.valor1" defaultMessage="Autenticidad" /></li>
          <li><FormattedMessage id="quienes.valor2" defaultMessage="Comunidad" /></li>
          <li><FormattedMessage id="quienes.valor3" defaultMessage="Sostenibilidad" /></li>
        </ul>
      </div>
    </section>
  );
}

export default QuienesSomos;

// src/Components/ProductorCard.js
import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./Productores.css";

function ProductorCard({ productor }) {
  return (
    <div className="productor-card">
      <h3>{productor.nombre}</h3>
      <p className="productor-ubicacion">
        <strong><FormattedMessage id="productores.ubicacion" />:</strong> {productor.ubicacion}
      </p>
      {productor.foto ? (
        <img
          src={productor.foto}
          alt={productor.nombre}
          className="productor-img"
        />
      ) : (
        <div className="productor-img-placeholder">
          <span>Sin imagen</span>
        </div>
      )}
      <p className="productor-descripcion">{productor.descripcion}</p>
      <Link to={`/productores/${productor.id}`} className="btn-compra">
        <FormattedMessage id="productores.calificar.boton" />
      </Link>
    </div>
  );
}

export default ProductorCard;

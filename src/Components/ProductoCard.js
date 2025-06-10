// src/Components/ProductoCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl"; // 👈 Importamos traducción
import "./Productos.css";

function ProductoCard({ producto, agregarAlCarrito }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setCantidad(1);
    cerrarModal();
  };

  return (
    <div className="producto-card" data-testid={`producto-${producto.id}`}>
      <h3 data-testid="producto-nombre">{producto.nombre}</h3>
      <p className="categoria" data-testid="producto-categoria">
        <strong><FormattedMessage id="productos.categoria" />:</strong> {producto.categoria}
      </p>
      <img
        src={producto.foto}
        alt={producto.nombre}
        className="producto-img"
        data-testid="producto-imagen"
      />
      <div className="estrellas" data-testid="producto-estrellas">★★★★★</div>
      <p className="producto-precio" data-testid="producto-precio">
        ${producto.precio.toLocaleString()} COP
      </p>
      <p className="descripcion" data-testid="producto-descripcion">{producto.descripcion}</p>

      <div className="botones-producto">
        <button
          className="boton boton-carrito"
          onClick={abrirModal}
          data-testid="producto-agregar"
        >
          <FormattedMessage id="productos.agregarCarrito" />
        </button>
        <Link
          to={`/productos/${producto.id}`}
          className="boton boton-info"
          data-testid="producto-vermas"
        >
          <FormattedMessage id="productos.verMas" />
        </Link>
      </div>

      {mostrarModal && (
        <div className="modal" data-testid="producto-modal">
          <div className="modal-contenido">
            <h3><FormattedMessage id="productos.modal.titulo" /></h3>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              data-testid="producto-cantidad"
              aria-label="Cantidad del producto"
            />
            <div className="modal-botones">
              <button
                className="boton-carrito"
                onClick={handleAgregar}
                data-testid="producto-confirmar"
              >
                <FormattedMessage id="productos.modal.confirmar" />
              </button>
              <button
                className="boton-info"
                onClick={cerrarModal}
                data-testid="producto-cancelar"
              >
                <FormattedMessage id="productos.modal.cancelar" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductoCard;

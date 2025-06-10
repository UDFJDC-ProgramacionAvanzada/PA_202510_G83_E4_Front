// src/Components/Carrito.js
import React, { useEffect, useState } from "react";
import "./Productos.css";

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const incrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const decrementarCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const calcularCantidadTotal = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  return (
    <div className="productos-container">
      <h2 className="carrito-titulo">🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          {/* Cuadro flotante */}
          <div className="carrito-flotante">
            <p className="total-carrito">
              <strong>Total:</strong> ${calcularTotal().toLocaleString()} COP
            </p>
            <p className="cantidad-total">
              <strong>Productos:</strong> {calcularCantidadTotal()}
            </p>
            <button className="btn-volver" onClick={() => window.location.href = '/compra'}>Comprar</button>
          </div>

          <section className="productos">
            {carrito.map((producto, index) => (
              <div key={index} className="producto-card">
                <h3>{producto.nombre}</h3>
                <p className="categoria">
                  <strong>Categoría:</strong> {producto.categoria}
                </p>
                <img
                  src={producto.foto}
                  alt={producto.nombre}
                  className="producto-img"
                />
                <div className="estrellas">★★★★★</div>
                <p className="precio">
                  ${producto.precio.toLocaleString()} COP
                </p>
                <p className="descripcion">{producto.descripcion}</p>
                <p>
                  <strong>Cantidad:</strong> {producto.cantidad}
                </p>
                <div className="botones-producto">
                  <button
                    className="boton-carrito"
                    onClick={() => incrementarCantidad(producto.id)}
                  >
                    ➕
                  </button>
                  <button
                    className="boton-carrito"
                    onClick={() => decrementarCantidad(producto.id)}
                  >
                    ➖
                  </button>
                  <button
                    className="boton-info"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default Carrito;

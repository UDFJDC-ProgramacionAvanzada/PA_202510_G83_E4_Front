import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Productos.css";

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const userLang = navigator.language || navigator.userLanguage;

    // This part of the code fetches product data based on the user's language.
    // The URLs provided in the original code snippets seem to point to different repositories,
    // which might lead to inconsistencies if not managed properly.
    // For a unified approach, ensure both language versions of your product data
    // are accessible from a consistent and reliable source.
    const url = userLang.startsWith("es")
      ? "https://raw.githubusercontent.com/UDFJDC-ProgramacionAvanzada/PA_202510_G83_E4_Front/main/src/Mocks/Productos.json"
      : "https://raw.githubusercontent.com/DominicRobayod/PA_202510_G83_E4_Front/main/src/Mocks/EnProductos.json";

    fetch(url)
      .then((res) => res.json())
      .then((productosTraducidos) => {
        const carritoActualizado = carritoGuardado.map((item) => {
          const actualizado = productosTraducidos.find((p) => p.id === item.id);
          return actualizado ? { ...actualizado, cantidad: item.cantidad } : item;
        });
        setCarrito(carritoActualizado);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setCarrito(carritoGuardado); // Fallback if fetch fails
      });
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
      <h2 className="carrito-titulo">
        <FormattedMessage id="carrito.titulo" />
      </h2>

      {carrito.length === 0 ? (
        <p><FormattedMessage id="carrito.vacio" /></p>
      ) : (
        <>
          <div className="carrito-flotante">
            <p className="total-carrito">
              <strong><FormattedMessage id="carrito.total" />:</strong> ${calcularTotal().toLocaleString()} COP
            </p>
            <p className="cantidad-total">
              <strong><FormattedMessage id="carrito.productos" />:</strong> {calcularCantidadTotal()}
            </p>
            {/* The merged part: using onClick to navigate */}
            <button className="btn-volver" onClick={() => window.location.href = '/compra'}>
              <FormattedMessage id="carrito.comprar" defaultMessage="Comprar" />
            </button>
          </div>

          <section className="productos">
            {carrito.map((producto, index) => (
              <div key={index} className="producto-card">
                <h3>{producto.nombre}</h3>
                <p className="categoria">
                  <strong><FormattedMessage id="carrito.categoria" />:</strong> {producto.categoria}
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
                  <strong><FormattedMessage id="carrito.cantidad" />:</strong> {producto.cantidad}
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
                    <FormattedMessage id="carrito.eliminar" />
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
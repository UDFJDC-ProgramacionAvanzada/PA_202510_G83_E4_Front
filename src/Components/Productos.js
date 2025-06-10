import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl"; // 👈 Importamos FormattedMessage
import ProductoCard from "./ProductoCard";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("none");
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // 🔥 Aquí definimos el link para español y el hueco para inglés
    const userLang = navigator.language || navigator.userLanguage;
    let url;
    if (userLang.startsWith("es")) {
      url = "https://raw.githubusercontent.com/UDFJDC-ProgramacionAvanzada/PA_202510_G83_E4_Front/refs/heads/main/src/Mocks/Productos.json";
    } else {
      url = "https://raw.githubusercontent.com/DominicRobayod/PA_202510_G83_E4_Front/refs/heads/main/src/Mocks/EnProductos.json"; 
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProductos(data));

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const agregarAlCarrito = (producto, cantidad) => {
    const index = carrito.findIndex((item) => item.id === producto.id);
    let nuevoCarrito;
    if (index !== -1) {
      nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += cantidad;
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad }];
    }
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const filtrarProductos = () => {
    let filtrados = productos.filter((producto) => {
      const termino = busqueda.toLowerCase();
      return (
        producto.nombre.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino)
      );
    });

    if (ordenPrecio === "asc") {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === "desc") {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    return filtrados;
  };

  return (
    <div className="productos-container">
      <h2 className="productos-titulo">
        <FormattedMessage id="productos.titulo" />
      </h2>
      <div className="productos-filtros">
        <FormattedMessage id="productos.buscar.placeholder" defaultMessage="Buscar por nombre o categoría...">
        {(placeholderText) => (
          <input
            type="text"
            placeholder={placeholderText}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
        )}
</FormattedMessage>

       <select
        value={ordenPrecio}
        onChange={(e) => setOrdenPrecio(e.target.value)}
        className="select-precio"
        id="ordenPrecio"
        aria-label="Ordenar productos por precio"
      >
          <option value="none">
            <FormattedMessage id="productos.ordenar" />
          </option>
          <option value="asc">
            <FormattedMessage id="productos.menorMayor" />
          </option>
          <option value="desc">
            <FormattedMessage id="productos.mayorMenor" />
          </option>
        </select>
      </div>
      <section className="productos">
        {filtrarProductos().map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </section>
    </div>
  );
}

export default Productos;

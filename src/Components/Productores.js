// src/Components/Productores.js
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import ProductorCard from "./ProductorCard";
import "./Productores.css";

function Productores() {
  const [productores, setProductores] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const url = userLang.startsWith("es")
      ? "https://raw.githubusercontent.com/UDFJDC-ProgramacionAvanzada/PA_202510_G83_E4_Front/refs/heads/main/src/Mocks/Productores.json"
      : "https://raw.githubusercontent.com/DominicRobayod/PA_202510_G83_E4_Front/refs/heads/main/src/Mocks/EnProductores.json"; // 🔜 cuando lo tengas

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProductores(data));
  }, []);

  const filtrarProductores = () => {
    const termino = busqueda.toLowerCase();
    return productores.filter(
      (productor) =>
        productor.nombre.toLowerCase().includes(termino) ||
        productor.ubicacion.toLowerCase().includes(termino)
    );
  };

  return (
    <div className="productores-container">
      <h2 className="productores-titulo">
        <FormattedMessage id="productores.titulo" />
      </h2>

      <div className="productores-filtros">
        <FormattedMessage id="productores.buscar.placeholder">
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

      </div>

      <section className="productores-grid">
        {filtrarProductores().map((productor) => (
          <ProductorCard key={productor.id} productor={productor} />
        ))}
      </section>
    </div>
  );
}

export default Productores;

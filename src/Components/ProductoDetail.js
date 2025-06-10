import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import "./Productos.css";

function ProductoDetail() {
  const { productoId } = useParams();
  const [producto, setProducto] = useState(null);
  const [calificacion, setCalificacion] = useState(1);
  const [comentario, setComentario] = useState("");
  const intl = useIntl();

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const url = userLang.startsWith("es")
      ? "https://raw.githubusercontent.com/UDFJDC-ProgramacionAvanzada/PA_202510_G83_E4_Front/main/src/Mocks/Productos.json"
      : "https://raw.githubusercontent.com/DominicRobayod/PA_202510_G83_E4_Front/main/src/Mocks/EnProductos.json";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(productoId));
        setProducto(found);

        // Cargar calificación previa si existe
        const guardado = JSON.parse(localStorage.getItem(`review-${productoId}`));
        if (guardado) {
          setCalificacion(guardado.calificacion);
          setComentario(guardado.comentario);
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, [productoId]);

  const manejarEnvio = () => {
    const data = {
      calificacion,
      comentario
    };
    localStorage.setItem(`review-${productoId}`, JSON.stringify(data));
    alert(intl.formatMessage({ id: "productos.mensajeGuardado" }));
  };

  if (!producto) {
    return <div className="productos-container">Cargando...</div>;
  }

  return (
    <div className="producto-detail-container">
      <div className="producto-detail-left">
        <div className="producto-imagen-contenedor">
          {producto.foto ? (
            <img
              src={producto.foto}
              alt={producto.nombre}
              className="producto-detail-img"
            />
          ) : (
            <div className="producto-img-placeholder">
              <span>Sin imagen</span>
            </div>
          )}
        </div>

        <h2>{producto.nombre}</h2>
        <p>
          <strong><FormattedMessage id="productos.precio" />:</strong> ${producto.precio.toLocaleString()} COP
        </p>
        <p>
          <strong><FormattedMessage id="productos.descripcion" />:</strong> {producto.descripcion}
        </p>
        <Link to="/tienda" className="btn-volver">
          <FormattedMessage id="productos.volver" />
        </Link>
      </div>

      <div className="producto-detail-right">
        <h3><FormattedMessage id="productos.calificar" /></h3>

        <div className="estrellas" data-testid="estrellas-interactivas">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setCalificacion(star)}
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: "#FFD700"
              }}
              data-testid={`estrella-${star}`}
            >
              {star <= calificacion ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        <p>
          <FormattedMessage id="productos.calificacion" />: {calificacion} / 5
        </p>

        <textarea
          className="comentario"
          placeholder={intl.formatMessage({ id: "productos.comentario.placeholder" })}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>

        <button className="btn-calificar" onClick={manejarEnvio}>
          <FormattedMessage id="productos.calificar.boton" />
        </button>
      </div>
    </div>
  );
}

export default ProductoDetail;

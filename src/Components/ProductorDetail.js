import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import "./Productores.css";

function ProductorDetail() {
  const { productorId } = useParams();
  const [productor, setProductor] = useState(null);
  const [calificacion, setCalificacion] = useState(1);
  const [comentario, setComentario] = useState("");
  const intl = useIntl();

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const url = userLang.startsWith("es")
      ? "https://raw.githubusercontent.com/UDFJDC-ProgramacionAvanzada/PA_202510_G83_E4_Front/refs/heads/main/src/Mocks/Productores.json"
      : "https://raw.githubusercontent.com/DominicRobayod/PA_202510_G83_E4_Front/main/src/Mocks/EnProductores.json";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(productorId));
        setProductor(found);

        // Intenta cargar review anterior
        const previo = JSON.parse(localStorage.getItem(`review-productor-${productorId}`));
        if (previo) {
          setCalificacion(previo.calificacion);
          setComentario(previo.comentario);
        }
      });
  }, [productorId]);

  const manejarEnvio = () => {
    const review = {
      calificacion,
      comentario
    };
    localStorage.setItem(`review-productor-${productorId}`, JSON.stringify(review));
    alert(intl.formatMessage({ id: "productores.mensajeGuardado" }));
  };

  if (!productor) {
    return <div className="productores-container">Cargando...</div>;
  }

  return (
    <div className="productor-detail-container">
      <div className="productor-detail-left">
        {productor.foto ? (
          <img
            src={productor.foto}
            alt={productor.nombre}
            className="productor-detail-img"
          />
        ) : (
          <div className="productor-detail-img-placeholder">
            <span>Sin imagen</span>
          </div>
        )}
        <h2>{productor.nombre}</h2>
        <p>
          <strong><FormattedMessage id="productores.ubicacion" />:</strong> {productor.ubicacion}
        </p>
        <p>{productor.descripcion}</p>
        <Link to="/productores" className="btn-volver">
          <FormattedMessage id="productores.volver" />
        </Link>
      </div>

      <div className="productor-detail-right">
        <h3><FormattedMessage id="productores.calificar" /></h3>

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
          <FormattedMessage id="productores.calificacion" />: {calificacion} / 5
        </p>

        <textarea
          className="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder={intl.formatMessage({ id: "productores.comentario.placeholder" })}
        ></textarea>

        <button className="btn-calificar" onClick={manejarEnvio}>
          <FormattedMessage id="productores.calificar.boton" />
        </button>
      </div>
    </div>
  );
}

export default ProductorDetail;

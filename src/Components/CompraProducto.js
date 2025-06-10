// src/Components/CompraVirtual.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompraProducto.css';

const CompraProducto = () => {
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const handlePago = () => {
    if (!metodoPago) {
      alert('❗ Por favor selecciona un método de pago');
      return;
    }

    setCompraConfirmada(true);
    localStorage.removeItem('carrito');
  };

  return (
    <div className="compra-container">
      <h2>Resumen de tu compra</h2>
      <p>Selecciona tu método de pago:</p>

      <div className="metodos-pago">
        <label>
          <input
            type="radio"
            name="pago"
            value="tarjeta"
            onChange={(e) => setMetodoPago(e.target.value)}
            disabled={compraConfirmada}
          />
          Tarjeta de crédito
        </label>
        <label>
          <input
            type="radio"
            name="pago"
            value="nequi"
            onChange={(e) => setMetodoPago(e.target.value)}
            disabled={compraConfirmada}
          />
          Nequi
        </label>
        <label>
          <input
            type="radio"
            name="pago"
            value="contraentrega"
            onChange={(e) => setMetodoPago(e.target.value)}
            disabled={compraConfirmada}
          />
          Contra entrega
        </label>
      </div>

      {!compraConfirmada ? (
        <button className="btn-pagar" onClick={handlePago}>
          Confirmar compra
        </button>
      ) : (
        <div className="recibo">
          <h3>✅ ¡Compra confirmada!</h3>
          <p><strong>Método de pago:</strong> {metodoPago}</p>
          <h4>📄 Recibo de compra:</h4>
          <ul>
            {carrito.map((producto, index) => (
              <li key={index}>
                {producto.nombre} x {producto.cantidad} = $
                {(producto.precio * producto.cantidad).toLocaleString()} COP
              </li>
            ))}
          </ul>
          <p className="recibo-total">
            <strong>Total pagado:</strong> ${calcularTotal().toLocaleString()} COP
          </p>
          <button className="btn-volver" onClick={() => navigate('/')}>Volver a la tienda</button>
        </div>
      )}
    </div>
  );
};

export default CompraProducto;

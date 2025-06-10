import React, { useState } from 'react';

const GestionPedidos = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      producto: 'Café Premium',
      cantidad: 2,
      precioUnitario: 10.0,
      total: 20.0,
      estado: 'Pendiente',
    },
    {
      id: 2,
      producto: 'Taza personalizada',
      cantidad: 1,
      precioUnitario: 15.0,
      total: 15.0,
      estado: 'Pendiente',
    },
  ]);

  const marcarComoEntregado = (id) => {
    const nuevosPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: 'Entregado' } : pedido
    );
    setPedidos(nuevosPedidos);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Gestión de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} style={{ textAlign: 'center' }}>
                <td>{pedido.producto}</td>
                <td>{pedido.cantidad}</td>
                <td>${pedido.precioUnitario.toFixed(2)}</td>
                <td>${pedido.total.toFixed(2)}</td>
                <td>{pedido.estado}</td>
                <td>
                  {pedido.estado === 'Pendiente' && (
                    <button onClick={() => marcarComoEntregado(pedido.id)}>
                      Marcar como entregado
                    </button>
                  )}
                  {pedido.estado === 'Entregado' && (
                    <span style={{ color: 'green' }}>✔</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionPedidos;

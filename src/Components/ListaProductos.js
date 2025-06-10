import React from 'react';

const ListaProductos = ({ productos }) => {
  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Productos Registrados</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {productos.map((producto, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                gap: '10px',
              }}
            >
              <img
                src={producto.imagenUrl}
                alt={producto.nombreProducto}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <h3>{producto.nombreProducto}</h3>
                <p>{producto.descripcionProducto}</p>
                <strong>${producto.precioProducto}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaProductos;

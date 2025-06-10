import React, { useState } from 'react';
import './RegistroEmp.css';

const RegistroProducto = () => {
  const [form, setForm] = useState({
    nombreProducto: '',
    precio: '',
    cantidad: '',
    descripcion: '',
    imagen: null,
  });

  const [errores, setErrores] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, imagen: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombreProducto || !form.precio || !form.cantidad || !form.descripcion || !form.imagen) {
      setErrores('Todos los campos son obligatorios');
      return;
    }

    if (isNaN(form.precio) || isNaN(form.cantidad)) {
      setErrores('Precio y cantidad deben ser numéricos');
      return;
    }

    setErrores('');
    alert('Producto registrado con éxito');

    // Aquí podrías enviar los datos (incluyendo la imagen) a una API usando FormData
    console.log(form);
  };

  return (
    <div className='formularioRegistro'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del producto:</label>
          <input
            type="text"
            name="nombreProducto"
            value={form.nombreProducto}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label>Imagen del producto:</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {errores && <div className="error">{errores}</div>}

        <button type="submit">Registrar producto</button>
      </form>
    </div>
  );
};

export default RegistroProducto;

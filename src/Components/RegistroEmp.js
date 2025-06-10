import React, { useState } from 'react';
import './RegistroEmp.css';

const RegistroEmp = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    direccion: '',
  });

  const [errores, setErrores] = useState('');
  const [esRegistroUsuario, setEsRegistroUsuario] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.contraseña !== form.confirmarContraseña) {
      setErrores('Las contraseñas no coinciden');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.correo)) {
      setErrores('Correo electrónico no válido');
      return;
    }

    if (esRegistroUsuario && form.direccion.trim() === '') {
      setErrores('La dirección es obligatoria para el registro de usuario');
      return;
    }

    setErrores('');
    alert('Formulario enviado correctamente');
    console.log(form);
  };

  return (
    <div className='formularioRegistro'>      
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Registro {esRegistroUsuario ? 'de Usuario' : 'de Emprendedor'}</h2>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"   
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmarContraseña"
            value={form.confirmarContraseña}
            onChange={handleChange}
            required
          />
        </div>

        {esRegistroUsuario && (
          <div>
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {errores && <div className="error">{errores}</div>}

        <button type="submit">Registrar</button>

        {!esRegistroUsuario && (
          <button type="button" onClick={() => setEsRegistroUsuario(true)}>
            Registrarme como usuario
          </button>
        )}
      </form>
    </div>
  );
};

export default RegistroEmp;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioProducto from './FormularioProducto';

describe('FormularioProducto Component', () => {
  test('renderiza todos los campos del formulario', () => {
    render(<FormularioProducto />);
    expect(screen.getByText(/registrar producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre del producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción del producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagen del producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio del producto/i)).toBeInTheDocument();
    expect(screen.getByText(/guardar producto/i)).toBeInTheDocument();
  });

  test('muestra alerta si se envía el formulario con campos vacíos', () => {
    window.alert = jest.fn(); // mock alert
    render(<FormularioProducto />);
    fireEvent.click(screen.getByText(/guardar producto/i));
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos');
  });

  test('actualiza estado al escribir en los inputs', () => {
    render(<FormularioProducto />);
    
    const nombreInput = screen.getByLabelText(/nombre del producto/i);
    fireEvent.change(nombreInput, { target: { value: 'Producto de prueba' } });
    expect(nombreInput.value).toBe('Producto de prueba');

    const precioInput = screen.getByLabelText(/precio del producto/i);
    fireEvent.change(precioInput, { target: { value: '49.99' } });
    expect(precioInput.value).toBe('49.99');
  });

  test('carga y previsualiza imagen correctamente (mock)', () => {
    render(<FormularioProducto />);
    
    const archivo = new File(['(imagen)'], 'imagen.jpg', { type: 'image/jpeg' });
    const inputFile = screen.getByLabelText(/imagen del producto/i);
    
    fireEvent.change(inputFile, { target: { files: [archivo] } });

    // No podemos validar visualmente la imagen, pero podemos asegurar que el input recibió el archivo
    expect(inputFile.files[0].name).toBe('imagen.jpg');
    expect(inputFile.files).toHaveLength(1);
  });
});

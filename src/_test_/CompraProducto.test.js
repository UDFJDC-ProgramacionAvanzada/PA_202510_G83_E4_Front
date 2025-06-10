// CompraProducto.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompraProducto from './536c666f-78c3-4477-ab4c-de6de6e62fd9';

const mockProducto = {
  nombreProducto: 'Camiseta',
  descripcionProducto: 'Camiseta 100% algodón',
  precioProducto: '25.50',
  imagenUrl: 'https://example.com/camiseta.jpg'
};

describe('CompraProducto Component', () => {
  test('muestra mensaje si no hay producto', () => {
    render(<CompraProducto producto={null} />);
    expect(screen.getByText(/no hay producto seleccionado/i)).toBeInTheDocument();
  });

  test('renderiza correctamente con producto', () => {
    render(<CompraProducto producto={mockProducto} />);
    expect(screen.getByText('Comprar Producto')).toBeInTheDocument();
    expect(screen.getByText(mockProducto.nombreProducto)).toBeInTheDocument();
    expect(screen.getByText(mockProducto.descripcionProducto)).toBeInTheDocument();
    expect(screen.getByText(/precio unitario/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProducto.imagenUrl);
  });

  test('actualiza cantidad y muestra total correcto al comprar', () => {
    render(<CompraProducto producto={mockProducto} />);
    const input = screen.getByLabelText(/cantidad/i);
    const button = screen.getByText(/comprar/i);

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.click(button);

    expect(screen.getByText(/¡compra realizada!/i)).toHaveTextContent('Total: $76.50');
  });

  test('evita cantidad menor o igual a 0', () => {
    render(<CompraProducto producto={mockProducto} />);
    const input = screen.getByLabelText(/cantidad/i);

    fireEvent.change(input, { target: { value: '-2' } });
    expect(input.value).toBe('1'); // React's useState will set it to 1 in the handler
  });
});

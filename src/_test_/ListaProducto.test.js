// ListaProductos.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ListaProductos from './ListaProductos';

const mockProductos = [
  {
    nombreProducto: 'Café Gourmet',
    descripcionProducto: 'Café orgánico de alta calidad',
    precioProducto: '12.99',
    imagenUrl: 'https://example.com/cafe.jpg',
  },
  {
    nombreProducto: 'Mug térmico',
    descripcionProducto: 'Mantiene tus bebidas calientes por más tiempo',
    precioProducto: '8.50',
    imagenUrl: 'https://example.com/mug.jpg',
  },
];

describe('ListaProductos Component', () => {
  test('muestra mensaje si no hay productos', () => {
    render(<ListaProductos productos={[]} />);
    expect(screen.getByText(/no hay productos registrados/i)).toBeInTheDocument();
  });

  test('renderiza la lista de productos correctamente', () => {
    render(<ListaProductos productos={mockProductos} />);
    expect(screen.getByText('Productos Registrados')).toBeInTheDocument();
    expect(screen.getByText(mockProductos[0].nombreProducto)).toBeInTheDocument();
    expect(screen.getByText(mockProductos[1].nombreProducto)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  test('muestra el precio de los productos', () => {
    render(<ListaProductos productos={mockProductos} />);
    expect(screen.getByText(`$${mockProductos[0].precioProducto}`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProductos[1].precioProducto}`)).toBeInTheDocument();
  });
});

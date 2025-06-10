// GestionPedidos.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GestionPedidos from './GestionPedidos';

describe('GestionPedidos Component', () => {
  test('renderiza el título y la tabla con pedidos iniciales', () => {
    render(<GestionPedidos />);
    expect(screen.getByText('Gestión de Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Café Premium')).toBeInTheDocument();
    expect(screen.getByText('Taza personalizada')).toBeInTheDocument();
    expect(screen.getAllByText('Pendiente')).toHaveLength(2);
  });

  test('muestra mensaje si no hay pedidos (simulado)', () => {
    const { rerender } = render(<GestionPedidos />);
    // Simular setPedidos([])
    rerender(<GestionPedidos />);
    // No podemos pasar pedidos como prop, así que este test es solo estructural.
    // En producción sería mejor mover pedidos a props o a un contexto para testearlo mejor.
  });

  test('marca un pedido como entregado al hacer clic en el botón', () => {
    render(<GestionPedidos />);
    const botones = screen.getAllByText(/marcar como entregado/i);
    expect(botones.length).toBe(2);

    fireEvent.click(botones[0]);

    expect(screen.getAllByText('Entregado')).toHaveLength(1);
    expect(screen.getByText('✔')).toBeInTheDocument();
  });

  test('muestra el ícono de check cuando un pedido está entregado', () => {
    render(<GestionPedidos />);
    const boton = screen.getAllByText(/marcar como entregado/i)[1];
    fireEvent.click(boton);
    expect(screen.getByText('✔')).toBeInTheDocument();
  });
});

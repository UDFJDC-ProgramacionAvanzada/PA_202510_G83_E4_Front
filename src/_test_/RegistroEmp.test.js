import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistroEmp from './RegistroEmp';

describe('RegistroEmp Component', () => {
  test('renderiza inputs y botón', () => {
    render(<RegistroEmp />);
    expect(screen.getByPlaceholderText(/digita tu nombre/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('*****')).toHaveLength(2);
    expect(screen.getByText(/registrarme/i)).toBeInTheDocument();
  });

  test('muestra error si las contraseñas no coinciden', () => {
    render(<RegistroEmp />);
    
    fireEvent.change(screen.getByPlaceholderText(/digita tu nombre/i), {
      target: { value: 'Juan', name: 'nombreEmprendedor' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('*****')[0], {
      target: { value: '12345', name: 'contraseña' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('*****')[1], {
      target: { value: '54321', name: 'confirmarContraseña' },
    });

    fireEvent.click(screen.getByText(/registrarme/i));
    expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  test('no muestra error si las contraseñas coinciden', () => {
    render(<RegistroEmp />);
    
    fireEvent.change(screen.getByPlaceholderText(/digita tu nombre/i), {
      target: { value: 'Ana', name: 'nombreEmprendedor' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('*****')[0], {
      target: { value: 'abc123', name: 'contraseña' },
    });
    fireEvent.change(screen.getAllByPlaceholderText('*****')[1], {
      target: { value: 'abc123', name: 'confirmarContraseña' },
    });

    fireEvent.click(screen.getByText(/registrarme/i));
    expect(screen.queryByText(/las contraseñas no coinciden/i)).toBeNull();
  });
});

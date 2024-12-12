// src/components/__tests__/Button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Elements/Button';  // Pastikan path ke Button benar

describe('Button Component', () => {
  
  // Test 1: Memastikan komponen Button dirender dengan benar
  it('should render the button with children text', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
  });

  // Test 2: Memastikan kelas CSS sesuai dengan variant yang diberikan
  it('should have the correct classes based on the variant prop', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-primary text-white hover:bg-primary-dark');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(buttonElement).toHaveClass('bg-transparent border border-primary-dark text-[#515151] text-sm');
  });

  // Test 3: Memastikan tombol disabled tidak bisa diklik
  it('should not be clickable when disabled', () => {
    const handleClick = jest.fn();
    render(<Button variant="disabled" onClick={handleClick}>Disabled</Button>);
    const buttonElement = screen.getByRole('button');
    
    fireEvent.click(buttonElement); // Coba klik tombol
    expect(handleClick).not.toHaveBeenCalled(); // Fungsi tidak dipanggil
    expect(buttonElement).toBeDisabled(); // Tombol harus dalam keadaan disabled
  });

  // Test 4: Memastikan tombol bisa diklik ketika tidak disabled
  it('should be clickable when not disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    
    fireEvent.click(buttonElement); // Coba klik tombol
    expect(handleClick).toHaveBeenCalledTimes(1); // Fungsi harus dipanggil sekali
  });
});

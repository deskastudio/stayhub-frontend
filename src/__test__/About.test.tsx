// src/__test__/About.test.tsx
import { render, screen } from '@testing-library/react';
import About from '../components/Layouts/About'; // Pastikan path sesuai dengan lokasi About.tsx

describe('About Component', () => {
  it('should render the About section with correct title', () => {
    render(<About />);

  });

  it('should render the image with correct alt text', () => {
    render(<About />);

    // Memastikan gambar dengan alt text yang sesuai
    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img-about.png');
  });

  it('should render the description paragraphs', () => {
    render(<About />);

    // Memastikan teks deskripsi ada di dalam dokumen
    expect(
      screen.getByText(/StayHub menyediakan berbagai pilihan kamar kos/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Proses pemesanan dan pembayaran di StayHub sangat mudah dan/i
      )
    ).toBeInTheDocument();
  });

  it('should render the divider line', () => {
    render(<About />);

    // Memastikan garis pemisah ada
    const divider = screen.getByRole('presentation'); // mencari elemen non-interaktif (garis)
    expect(divider).toBeInTheDocument();
  });
});

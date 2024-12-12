// src/__test__/AdminLayout.test.tsx
import { render, screen } from '@testing-library/react';
import AdminLayout from '../components/Layouts/AdminLayout'; // Pastikan path sesuai dengan lokasi AdminLayout.tsx
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('AdminLayout Component', () => {
  it('should render Sidebar', () => {
    render(
      <MemoryRouter>
        <AdminLayout>
          <div>Test Content</div>
        </AdminLayout>
      </MemoryRouter>
    );

    // Jika Sidebar menggunakan <div> atau elemen lain, kamu bisa mencari dengan kelas CSS atau tag
    // Misalnya, jika Sidebar menggunakan kelas CSS tertentu, kita bisa menggunakan getByClassName
    expect(screen.getByTestId('sidebar')).toBeInTheDocument(); // Misalnya Sidebar memiliki test-id="sidebar"
  });

  it('should render children content', () => {
    render(
      <MemoryRouter>
        <AdminLayout>
          <div>Test Content</div>
        </AdminLayout>
      </MemoryRouter>
    );

    // Memastikan children yang diberikan dirender
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});

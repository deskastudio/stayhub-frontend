import React, { ReactNode } from 'react';

// Definisikan antarmuka untuk props komponen, termasuk properti `children`
interface MainLayoutProps {
  children: ReactNode;
}

// Komponen MainLayout hanya menampilkan area konten utama
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className='min-h-screen  bg-primary-custom flex-grow p-6'>
    {children}
  </div>
);

export default MainLayout;

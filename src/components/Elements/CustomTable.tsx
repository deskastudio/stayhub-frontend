import React, { useState } from 'react';

interface CustomTableProps<T> {
  columns: string[]; // Nama kolom tabel
  data: T[]; // Data tabel dengan tipe generik
  itemsPerPage?: number; // Jumlah item per halaman
}

const CustomTable = <T,>({
  columns,
  data,
  itemsPerPage = 5,
}: CustomTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total halaman

  // Data yang ditampilkan pada halaman saat ini
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk berpindah halaman
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table-auto w-full border border-gray-300 shadow-md rounded-lg'>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className='px-4 py-2 font-bold text-white text-center bg-primary-dark'
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100`}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className='px-4 py-2 text-center border'>
                  {typeof row[col as keyof T] === 'string' &&
                  (row[col as keyof T] as string).startsWith('http') ? ( // Jika URL gambar
                    <img
                      src={row[col as keyof T] as string}
                      alt={col}
                      className='w-16 h-16 rounded-lg object-cover mx-auto'
                    />
                  ) : (
                    <>{row[col as keyof T] as React.ReactNode}</>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='flex justify-between items-center mt-4'>
        <span className='text-sm text-gray-600'>
          Jumlah {currentData.length} dari {data.length}
        </span>
        <div className='flex space-x-2'>
          <button
            onClick={() => goToPage(currentPage - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
            }`}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300'
                : 'bg-blue-500 text-white'
            }`}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;

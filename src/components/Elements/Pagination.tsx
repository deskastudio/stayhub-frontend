import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  totalItems: number; // Total item
  itemsPerPage: number; // Jumlah item per halaman
  activePage: number; // Halaman aktif
  setActivePage: Dispatch<SetStateAction<number>>; // Fungsi untuk mengatur halaman aktif
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  activePage,
  setActivePage,
}) => {
  // Hitung total halaman
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fungsi untuk menangani klik tombol
  const handlePageClick = (page: number) => {
    setActivePage(page); // Mengatur halaman yang aktif
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex space-x-1 mb-2'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`w-10 px-3 py-2 rounded transition duration-200 ${
              activePage === index + 1
                ? 'bg-primary border text-white' // Ubah teks menjadi putih saat aktif
                : 'bg-white border border-black text-black'
            }`}
            onClick={() => handlePageClick(index + 1)} // Mengatur halaman aktif saat diklik
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;

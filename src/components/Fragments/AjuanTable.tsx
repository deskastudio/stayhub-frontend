import { useState, useEffect } from 'react';
import Button from '../Elements/Button';
import axios from 'axios';
import DetailModal from './AjuanDetailModal';
import BalasModal from './AjuanBalasModal';
import EditStatusModal from './EditStatusModal';
import { IRoomComplaint } from '../../interfaces/models/RoomComplaintInterfaces';

const AjuanTable: React.FC = () => {
  const [ajuanList, setAjuanList] = useState<IRoomComplaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAjuan, setSelectedAjuan] = useState<IRoomComplaint | null>(
    null
  );
  const [selectedForEdit, setSelectedForEdit] = useState<IRoomComplaint | null>(
    null
  );
  const [selectedForBalas, setSelectedForBalas] =
    useState<IRoomComplaint | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(5); // Jumlah item per halaman

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchAjuanList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/complaint', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.data)) {
          setAjuanList(response.data.data);
        } else {
          alert('Data tidak sesuai format.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        alert('Gagal memuat data ajuan');
      } finally {
        setLoading(false);
      }
    };

    fetchAjuanList();
  }, [token]);

  const handleDetailClick = (ajuan: IRoomComplaint) => {
    setSelectedAjuan(ajuan);
  };

  const handleBalasClick = (ajuan: IRoomComplaint) => {
    setSelectedForBalas(ajuan);
  };

  const handleEditClick = (ajuan: IRoomComplaint) => {
    setSelectedForEdit(ajuan);
  };

  const handleStatusUpdate = (id: string, updatedStatus: string) => {
    setAjuanList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, status: updatedStatus } : item
      )
    );
  };
  const handleResponseUpdate = (id: string, updatedResponse: string) => {
    setAjuanList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, response: updatedResponse } : item
      )
    );
  };

  const closeModal = () => {
    setSelectedAjuan(null);
    setSelectedForBalas(null);
    setSelectedForEdit(null);
  };

  const formatTanggal = (tanggal: string) => {
    const date = tanggal.split('T')[0];
    return date;
  };

  // Hitung data yang akan ditampilkan berdasarkan halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ajuanList.slice(indexOfFirstItem, indexOfLastItem);

  // Hitung jumlah halaman yang dibutuhkan
  const totalPages = Math.ceil(ajuanList.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : ajuanList.length === 0 ? (
        <p>Belum ada ajuan</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white shadow-md rounded-lg border-collapse'>
            <thead className='bg-primary-dark text-white'>
              <tr>
                <th className='p-4 text-center'>Tanggal</th>
                <th className='p-4 text-center'>Perihal</th>
                <th className='p-4 text-center'>Status</th>
                <th className='p-4 text-center'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ajuan) => (
                <tr key={ajuan.id} className='border-b'>
                  <td className='p-4 text-center'>
                    {formatTanggal(ajuan.createdAt)}
                  </td>
                  <td className='p-4 text-center'>{ajuan.title}</td>
                  <td className="p'p-4 text-center w-32">
                    <span
                      className={`px-2 py-1 rounded text-center w-full inline-block ${
                        ajuan.status === 'Selesai'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {ajuan.status}
                    </span>
                  </td>
                  <td className='p-4 text-center space-x-2'>
                    <Button
                      variant='detail'
                      onClick={() => handleDetailClick(ajuan)}
                    >
                      Detail
                    </Button>
                    <Button
                      variant='primary'
                      onClick={() => handleBalasClick(ajuan)}
                    >
                      Balas
                    </Button>
                    <Button
                      variant='primary'
                      onClick={() => handleEditClick(ajuan)}
                    >
                      Edit Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className='flex justify-between items-center mt-4'>
            <span className='text-sm text-gray-600'>
              Jumlah {indexOfFirstItem + 1} -{' '}
              {Math.min(indexOfLastItem, ajuanList.length)} dari{' '}
              {ajuanList.length}
            </span>
            <div className='flex space-x-2'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-2 rounded-md text-black bg-gray-300 disabled:opacity-50 '
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md text-white ${
                      page === currentPage
                        ? 'bg-blue-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-3 py-2 rounded-md text-black bg-gray-300  disabled:opacity-50'
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAjuan && (
        <DetailModal data={selectedAjuan} onClose={closeModal} />
      )}
      {selectedForBalas && (
        <BalasModal
          ajuan={selectedForBalas}
          onClose={closeModal}
          onResponseUpdate={handleResponseUpdate}
        />
      )}
      {selectedForEdit && (
        <EditStatusModal
          isOpen={true}
          ajuan={selectedForEdit}
          onClose={closeModal}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default AjuanTable;

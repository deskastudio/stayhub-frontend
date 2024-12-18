import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CustomTable from '../components/Elements/CustomTable';
import PopupTambahFasilitas from '../components/Fragments/PopupTambahFasilitas';
import SectionHeader from '../components/Elements/SectionHeader';
import Profile from '../components/Fragments/Profile';
import Button from '../components/Elements/Button';
import { IRoomFacility } from '../interfaces/models/RoomFacilityInterface';

const AdminDataFasilitas: React.FC = () => {
  const [fasilitasData, setFasilitasData] = useState<IRoomFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Get token from session storage
  const token = sessionStorage.getItem('token');

  // Fetch data fasilitas dari backend
  const fetchFasilitas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://stayhub-api.vercel.app/facility',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setFasilitasData(response.data.data);
    } catch (error) {
      console.error('Error fetching fasilitas data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Tambah fasilitas
  const handleAddFasilitas = (fasilitas: string) => {
    const newFasilitas: IRoomFacility = {
      id: Date.now().toString(),
      name: fasilitas,
    };
    setFasilitasData((prevData) => [...prevData, newFasilitas]);
    fetchFasilitas();
  };

  // Delete fasilitas
  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
      try {
        await axios.delete(
          `https://stayhub-api.vercel.app/facility/delete/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchFasilitas(); // Refresh data setelah penghapusan
        alert('Fasilitas berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting fasilitas:', error);
        alert('Gagal menghapus fasilitas.');
      }
    }
  };

  useEffect(() => {
    fetchFasilitas();
  }, [fetchFasilitas]);

  const columns = ['Nama Fasilitas', 'Aksi'];

  // Format data untuk tabel
  const formatTableData = (data: IRoomFacility[]) =>
    data.map((item) => ({
      'Nama Fasilitas': item.name,
      Aksi: (
        <div className='flex items-center justify-center space-x-2'>
          <Button variant='deleted' onClick={() => handleDelete(item.id)}>
            Hapus
          </Button>
        </div>
      ),
    }));

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <SectionHeader title='List Ajuan'>
        <Profile />
      </SectionHeader>

      <div className='flex justify-end mb-4'>
        <Button variant='add' onClick={() => setIsPopupOpen(true)}>
          Tambah Fasilitas
        </Button>
      </div>
      {loading ? (
        <div className='flex justify-center items-center'>
          <div className='w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin'></div>
          <p className='ml-4 text-lg font-semibold text-primary'>Loading...</p>
        </div>
      ) : (
        <CustomTable
          columns={columns}
          data={formatTableData(fasilitasData)}
          itemsPerPage={5}
        />
      )}
      <PopupTambahFasilitas
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddFasilitas}
      />
    </div>
  );
};

export default AdminDataFasilitas;

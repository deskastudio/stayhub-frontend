import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CustomTable from '../components/Elements/CustomTable';
import PopupTambahTypeKamar from '../components/Fragments/PopupTambahTypeKamar';
import PopupEditTypeKamar from '../components/Fragments/PopupEditTypeKamar';
import ProfileInfo from '../components/Elements/ProfileInfo';
import Button from '../components/Elements/Button';
import { IRoomFacility } from '../interfaces/models/RoomFacilityInterface';
import { IRoomType } from '../interfaces/models/RoomTypeInterface';

const AdminTypeKamar: React.FC = () => {
  const [typeKamarData, setTypeKamarData] = useState<IRoomType[]>([]);
  const [fasilitasData, setFasilitasData] = useState<IRoomFacility[]>([]);
  const [loading, setLoading] = useState(true);

  // Popup states
  const [isTambahPopupOpen, setIsTambahPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentData, setCurrentData] = useState<IRoomType | null>(null);

  const token = sessionStorage.getItem('token');

  // Fetch Fasilitas Data (Memoized with useCallback)
  const fetchFasilitas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/facility', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const fasilitasTransformed = response.data.data.map(
        (item: IRoomFacility) => ({
          id: item.id,
          nama: item.name,
        })
      );
      setFasilitasData(fasilitasTransformed);
      console.log('Data fasilitas berhasil diambil:', fasilitasTransformed);
    } catch (error) {
      console.error('Error fetching fasilitas data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFasilitas();
  }, [fetchFasilitas]);

  // Fetch Type Kamar Data (Memoized with useCallback)
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const transformedData = response.data.data.map((item: IRoomType) => ({
        id: item.id,
        namaTipe: item.name,
        fasilitas: item.facility.map((data: IRoomFacility) => ({
          id: data.id,
          nama: data.name,
        })),
        deskripsi: item.description,
        harga: item.cost,
      }));
      setTypeKamarData(transformedData);
    } catch (error) {
      console.error('Error fetching type kamar data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Add Type Kamar
  const handleAddTypeKamar = async (data: IRoomType) => {
    const payload = {
      name: data.name,
      facility: data.facility.map((f) => f.name),
      description: data.description,
      cost: data.cost,
    };

    console.log('Payload yang dikirim ke backend:', payload);

    try {
      await axios.post('http://localhost:8000/type/add', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchData();
      alert('Tipe kamar berhasil ditambahkan!');
      setIsTambahPopupOpen(false);
    } catch (error) {
      console.error('Error adding type kamar:', error);
    }
  };

  // Handle Edit Type Kamar
  const handleUpdateTypeKamar = async (data: IRoomType) => {
    if (!data.id) {
      alert('ID tidak ditemukan.');
      return;
    }

    const payload = {
      name: data.name,
      facility: data.facility.map((f) => f.name),
      description: data.description,
      cost: data.cost,
    };

    try {
      await axios.put(`http://localhost:8000/type/update/${data.id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchData();
      alert('Tipe kamar berhasil diperbarui!');
      setIsEditPopupOpen(false);
      setCurrentData(null);
    } catch (error) {
      console.error('Error updating type kamar:', error);
    }
  };

  // Handle Delete Type Kamar
  const handleDeleteTypeKamar = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tipe kamar ini?')) {
      try {
        await axios.delete(`http://localhost:8000/type/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        alert('Tipe kamar berhasil dihapus!');
        fetchData();
      } catch (error) {
        console.error('Error deleting type kamar:', error);
      }
    }
  };

  // Handle Edit Button Click
  const handleEditTypeKamar = (data: IRoomType) => {
    setCurrentData(data);
    setIsEditPopupOpen(true);
  };

  const columns = [
    'Nama Tipe Kamar',
    'Fasilitas',
    'Deskripsi',
    'Harga',
    'Aksi',
  ];

  const formatTableData = (data: IRoomType[]) =>
    data.map((item) => ({
      'Nama Tipe Kamar': item.name,
      Fasilitas:
        item.facility.map((f) => f.name).join(', ') || 'Tidak ada fasilitas',
      Deskripsi: item.description || 'Tidak ada deskripsi',
      Harga: `Rp ${item.cost.toLocaleString()}`,
      Aksi: (
        <div className='flex gap-2'>
          <Button variant='primary' onClick={() => handleEditTypeKamar(item)}>
            Edit
          </Button>
          <Button
            variant='deleted'
            onClick={() => handleDeleteTypeKamar(item.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    }));

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Data Tipe Kamar</h1>
        <ProfileInfo />
      </div>
      <div className='flex justify-end mb-4'>
        <Button
          variant='add'
          onClick={() => {
            setCurrentData(null);
            setIsTambahPopupOpen(true);
          }}
        >
          Tambah Tipe Kamar
        </Button>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : typeKamarData.length > 0 ? (
        <CustomTable
          columns={columns}
          data={formatTableData(typeKamarData)}
          itemsPerPage={5}
        />
      ) : (
        <p>Data tidak tersedia atau gagal dimuat.</p>
      )}

      {/* Add Popup */}
      <PopupTambahTypeKamar
        isOpen={isTambahPopupOpen}
        onClose={() => setIsTambahPopupOpen(false)}
        onSubmit={handleAddTypeKamar}
        fasilitasData={fasilitasData}
        currentData={null}
      />

      {/* Edit Popup */}
      <PopupEditTypeKamar
        isOpen={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setCurrentData(null);
        }}
        onSubmit={handleUpdateTypeKamar}
        currentData={currentData}
        fasilitasData={fasilitasData}
      />
    </div>
  );
};

export default AdminTypeKamar;

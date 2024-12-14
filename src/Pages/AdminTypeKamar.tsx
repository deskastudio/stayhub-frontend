// src/pages/AdminTypeKamar.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomTable from '../components/Elements/CustomTable';
import PopupTambahTypeKamar from '../components/Fragments/PopupTambahTypeKamar';
import PopupEditTypeKamar from '../components/Fragments/PopupEditTypeKamar';
import ProfileInfo from '../components/Elements/ProfileInfo';
import Button from '../components/Elements/Button';

interface Fasilitas {
  id: string;
  nama: string;
}

interface TypeKamar {
  id: string;
  namaTipe: string;
  fasilitas: Fasilitas[];
  deskripsi: string;
  harga: number;
}

const AdminTypeKamar: React.FC = () => {
  const [typeKamarData, setTypeKamarData] = useState<TypeKamar[]>([]);
  const [fasilitasData, setFasilitasData] = useState<Fasilitas[]>([]);
  const [loading, setLoading] = useState(true);

  // Popup states
  const [isTambahPopupOpen, setIsTambahPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentData, setCurrentData] = useState<TypeKamar | null>(null);

  const token = sessionStorage.getItem('token');

  // Fetch Fasilitas Data
  const fetchFasilitas = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/facility', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const fasilitasTransformed = response.data.data.map((item: any) => ({
        id: item.id,
        nama: item.name,
      }));
      setFasilitasData(fasilitasTransformed);
      console.log('Data fasilitas berhasil diambil:', fasilitasTransformed);
    } catch (error) {
      console.error('Error fetching fasilitas data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFasilitas();
  }, []);

  // Fetch Type Kamar Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/type', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log('Respons dari backend:', response.data);

      const transformedData = response.data.data.map((item: any) => ({
        id: item.id,
        namaTipe: item.name,
        fasilitas: item.facility.map((fasilitasItem: any) => ({
          id: fasilitasItem._id,
          nama: fasilitasItem.name,
        })),
        deskripsi: item.description,
        harga: item.cost,
      }));
      console.log('Data yang sudah ditransformasi:', transformedData);
      setTypeKamarData(transformedData);
    } catch (error) {
      console.error('Error fetching type kamar data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Add Type Kamar
  const handleAddTypeKamar = async (data: TypeKamar) => {
    const payload = {
      name: data.namaTipe,
      facility: data.fasilitas.map((f) => f.nama),
      description: data.deskripsi,
      cost: data.harga,
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
    } catch (error: any) {
      console.error(
        'Error adding type kamar:',
        error.response?.data || error.message
      );
      alert(error.response?.data.message || 'Gagal menambahkan tipe kamar.');
    }
  };

  // Handle Edit Type Kamar
  const handleUpdateTypeKamar = async (data: TypeKamar) => {
    if (!data.id) {
      alert('ID tidak ditemukan.');
      return;
    }

    const payload = {
      name: data.namaTipe,
      facility: data.fasilitas.map((f) => f.nama),
      description: data.deskripsi,
      cost: data.harga,
    };

    console.log('Payload yang dikirim untuk update:', payload);

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
    } catch (error: any) {
      console.error(
        'Error updating type kamar:',
        error.response?.data || error.message
      );
      alert(error.response?.data.message || 'Gagal memperbarui tipe kamar.');
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
      } catch (error: any) {
        console.error(
          'Error deleting type kamar:',
          error.response?.data || error.message
        );
        alert(error.response?.data.message || 'Gagal menghapus tipe kamar.');
      }
    }
  };

  // Handle Edit Button Click
  const handleEditTypeKamar = (data: TypeKamar) => {
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

  const formatTableData = (data: TypeKamar[]) =>
    data.map((item) => ({
      'Nama Tipe Kamar': item.namaTipe,
      Fasilitas:
        item.fasilitas.map((f) => f.nama).join(', ') || 'Tidak ada fasilitas',
      Deskripsi: item.deskripsi || 'Tidak ada deskripsi',
      Harga: `Rp ${item.harga.toLocaleString()}`,
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

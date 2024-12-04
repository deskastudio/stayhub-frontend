import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Button from '../Elements/Button';

interface TypeKamar {
  name: string;
}

interface PopupTambahKamarProps {
  isOpen: boolean;
  onClose: () => void;
  onKamarAdded: () => void;
  typeKamarData: TypeKamar[];
}

const PopupTambahKamar: React.FC<PopupTambahKamarProps> = ({
  isOpen,
  onClose,
  onKamarAdded,
  typeKamarData,
}) => {
  const [noKamar, setNoKamar] = useState<string>('');
  const [typeKamar, setTypeKamar] = useState<string>('');
  const [roomImages, setGambarKamar] = useState<FileList | null>(null);

  const token = sessionStorage.getItem('token');

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!noKamar || !typeKamar || !roomImages || roomImages.length === 0) {
      alert('Pastikan semua data terisi!');
      return;
    }

    const formData = new FormData();
    formData.append('name', noKamar);
    formData.append('type', typeKamar);
    Array.from(roomImages).forEach((image) =>
      formData.append('roomImages', image)
    );

    try {
      // Send data to API to add room
      const response = await axios.post(
        'http://localhost:8000/room/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Check response status
      if (response.status === 200 || response.status === 201) {
        alert('Kamar berhasil ditambahkan!');
        onKamarAdded(); // Refresh data
        onClose(); // Close popup
      } else {
        alert('Gagal menambahkan kamar.');
      }
    } catch (error: any) {
      console.error('Error menambahkan kamar:', error);
      alert(
        error.response?.data?.message ||
          'Terjadi kesalahan saat menambahkan kamar.'
      );
    }
  };

  // If popup is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3 overflow-y-auto max-h-full'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Tambah Kamar</h2>
          <Button variant='plain' onClick={onClose}>
            ×
          </Button>
        </div>
        <form onSubmit={handleSubmit} method='post'>
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Nama Kamar</label>
            <input
              type='text'
              value={noKamar}
              onChange={(e) => setNoKamar(e.target.value)}
              placeholder='Masukkan nama kamar'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Tipe Kamar */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Tipe Kamar</label>
            <select
              value={typeKamar}
              onChange={(e) => setTypeKamar(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
              required
            >
              <option value='' disabled>
                Pilih tipe kamar
              </option>
              {typeKamarData.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input Gambar Kamar */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Gambar Kamar</label>
            <input
              type='file'
              multiple
              onChange={(e) => setGambarKamar(e.target.files)}
              className='w-full px-3 py-2 border rounded-lg'
              required
            />
          </div>

          <div className='flex justify-end space-x-2'>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' variant='primary'>
              Tambah Kamar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahKamar;

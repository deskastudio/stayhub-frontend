import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Button from '../Elements/Button';

interface TypeKamar {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  type: {
    id: string;
    name: string;
  };
  status: string;
  images: { url: string; filename: string }[];
}

interface PopupEditKamarProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: Room | null;
  onKamarUpdated: () => void;
  typeKamarData: TypeKamar[];
}

const PopupEditKamar: React.FC<PopupEditKamarProps> = ({
  isOpen,
  onClose,
  currentData,
  onKamarUpdated,
  typeKamarData,
}) => {
  const [noKamar, setNoKamar] = useState<string>(''); // Room name
  const [typeKamar, setTypeKamar] = useState<string>(''); // Selected type ID
  const [statusKamar, setStatusKamar] = useState<'Tersedia' | 'Tidak Tersedia'>(
    'Tersedia'
  );
  const [gambarKamar, setGambarKamar] = useState<FileList | null>(null); // New images
  const [existingImages, setExistingImages] = useState<
    { url: string; filename: string }[]
  >([]); // Existing images

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (currentData) {
      setNoKamar(currentData.name);
      setTypeKamar(currentData.type.name);
      setStatusKamar(
        currentData.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'
      );
      setExistingImages(currentData.images);
    } else {
      setNoKamar('');
      setTypeKamar('');
      setStatusKamar('Tersedia');
      setExistingImages([]);
    }
  }, [currentData]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!noKamar || !typeKamar) {
      alert('Nama kamar dan tipe kamar harus diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('name', noKamar);
    formData.append('type', typeKamar);
    formData.append('status', statusKamar);
    if (gambarKamar && gambarKamar.length > 0) {
      Array.from(gambarKamar).forEach((image) =>
        formData.append('roomImages', image)
      );
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/room/update/${currentData?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Kamar berhasil diperbarui!');
        onKamarUpdated();
        onClose();
      } else {
        alert('Gagal memperbarui kamar.');
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error('Error memperbarui kamar:', err);
      alert(
        err.response?.data?.message ||
          'Terjadi kesalahan saat memperbarui kamar.'
      );
    }
  };

  // If popup is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3 overflow-y-auto max-h-full'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Edit Kamar</h2>
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

          {/* Status Kamar */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Status Kamar</label>
            <select
              value={statusKamar}
              onChange={(e) =>
                setStatusKamar(e.target.value as 'Tersedia' | 'Tidak Tersedia')
              }
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='Tersedia'>Tersedia</option>
              <option value='Tidak Tersedia'>Tidak Tersedia</option>
            </select>
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className='mb-4'>
              <label className='block font-bold mb-2'>
                Gambar Kamar Saat Ini
              </label>
              <div className='flex gap-2 overflow-x-auto'>
                {existingImages.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8000/${image.url}`} // Ensure URL aligns with static serving
                    alt={`Room ${currentData?.name}`}
                    className='w-20 h-20 object-cover rounded'
                  />
                ))}
              </div>
            </div>
          )}

          {/* Input Gambar Kamar */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>
              Tambah Gambar Kamar (Opsional)
            </label>
            <input
              type='file'
              multiple
              onChange={(e) => setGambarKamar(e.target.files)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          <div className='flex justify-end space-x-2'>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' variant='primary'>
              Update Kamar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditKamar;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Ajuan } from '../../Pages/UserListAjuan';
import { getUserId } from '../../utils/auth.utils';

interface Room {
  id: string;
  name: string;
}

interface AjuanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Ajuan, 'id'>) => void;
}

const AjuanModal: React.FC<AjuanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    roomId: '',
    perihal: 'Fasilitas',
    isiAjuan: '',
  });
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State untuk menyimpan file
  const [rooms, setRooms] = useState([]); // Untuk menyimpan daftar kamar
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil token dan userId
  const token = sessionStorage.getItem('token');
  const id = getUserId();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/room', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(response.data.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        alert('Gagal memuat daftar kamar.');
      }
    };

    fetchRooms();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { roomId, perihal, isiAjuan } = formData;

    // Validasi input form
    if (!roomId || !isiAjuan) {
      alert('Semua field harus diisi!');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('user', id); // Menambahkan user ID
    formDataToSubmit.append('room', roomId); // Menambahkan ID kamar
    formDataToSubmit.append('title', perihal); // Menambahkan judul pengajuan
    formDataToSubmit.append('description', isiAjuan); // Menambahkan deskripsi pengajuan
    formDataToSubmit.append('status', 'menunggu'); // Status default

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/complaint/${roomId}`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Ajuan berhasil dikirim!');
        onSubmit({
          user: id,
          room: roomId,
          title: perihal,
          description: isiAjuan,
          status: 'menunggu',
          perihal: '',
          tanggal: '',
          isiAjuan: '',
          balasan: '',
          createdAt: '',
          response: '',
        });
        setFormData({
          roomId: '',
          perihal: 'Fasilitas',
          isiAjuan: '',
        });
        onClose();
        navigate('/user-list-ajuan');
      } else {
        alert('Gagal mengirim ajuan, coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting ajuan:', error);
      alert('Gagal mengirim ajuan.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-lg'>
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          ×
        </button>
        <h2 className='text-lg font-bold mb-4'>Pengajuan Keluhan</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Kamar</label>
            <select
              name='roomId'
              value={formData.roomId}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value=''>Pilih Kamar</option>
              {rooms.length > 0 ? (
                rooms.map((room: Room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))
              ) : (
                <option value='' disabled>
                  Tidak ada kamar tersedia
                </option>
              )}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Perihal</label>
            <select
              name='perihal'
              value={formData.perihal}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value='Fasilitas'>Fasilitas</option>
              <option value='Kebersihan'>Kebersihan</option>
              <option value='Keamanan'>Keamanan</option>
              <option value='Lainnya'>Lainnya</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Isi Ajuan</label>
            <textarea
              name='isiAjuan'
              value={formData.isiAjuan}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
              placeholder='Masukkan keluhanmu'
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Upload Foto (Opsional)</label>
            <input type="file" name="images" multiple onChange={handleFileChange} className="w-full border rounded px-3 py-2" />
          </div> */}
          <div className='flex justify-end'>
            <button
              type='button'
              className='mr-2 bg-gray-500  hover:bg-gray-400 text-white px-4 py-2 rounded'
              onClick={onClose}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type='submit'
              className='bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded'
              disabled={loading}
            >
              {loading ? 'Mengirim...' : 'Kirim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanModal;

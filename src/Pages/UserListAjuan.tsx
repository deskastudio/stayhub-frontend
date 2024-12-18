import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from '../components/Fragments/Profile';
import Placeholder from '../components/Fragments/Placeholder';
import { getUserId } from '../utils/auth.utils';

// Menyesuaikan tipe data Ajuan
interface User {
  id: string;
  fullName: string;
}

interface Room {
  id: string;
}

export interface Ajuan {
  id: string;
  user: User;
  room: Room;
  title: string;
  description: string;
  perihal: string;
  status: string;
  tanggal: string;
  isiAjuan: string;
  balasan: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}

const UserListAjuan: React.FC = () => {
  const [ajuanList, setAjuanList] = useState<Ajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const id = getUserId();

  useEffect(() => {
    const fetchAjuan = async () => {
      try {
        if (!token) {
          console.error('Token tidak ditemukan');
          navigate('/login');
          return;
        }

        setLoading(true);
        const response = await axios.get(
          `https://stayhub-api.vercel.app/complaint/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data) {
          const ajuanData = response.data.data.map((ajuan: Ajuan) => ({
            ...ajuan,
            id: ajuan.id.toString(), // Konversi id ke string
            perihal: ajuan.title,
            status: ajuan.status,
            tanggal: ajuan.createdAt.split('T')[0],
            isiAjuan: ajuan.description,
            balasan: ajuan.response,
          }));
          setAjuanList(ajuanData);
        } else {
          setAjuanList([]); // Set ajuanList kosong jika tidak ada data
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setAjuanList([]); // Set ajuanList kosong jika terjadi error
        alert('Gagal mengambil data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchAjuan();
  }, [token, id, navigate]);

  const handleAddAjuan = () => {
    navigate('/user-ajuan');
  };

  return (
    <div className='p-8 flex-grow'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>List Ajuan</h1>
        <Profile />
      </div>

      <div>
        {loading ? (
          // Menampilkan pesan loading jika data sedang dimuat
          <div className='flex justify-center items-center'>
            <div className='w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin'></div>
            <p className='ml-4 text-lg font-semibold text-primary'>
              Loading...
            </p>
          </div>
        ) : ajuanList.length === 0 ? (
          <Placeholder
            title='Belum ada ajuan'
            description='Silakan tambahkan ajuan baru.'
            buttonText='Tambah Ajuan'
            onAdd={handleAddAjuan}
          />
        ) : (
          <table className='w-full border-collapse border'>
            <thead>
              <tr className='bg-primary-dark text-white'>
                <th className='px-4 py-2'>Tanggal</th>
                <th className='px-4 py-2'>Perihal</th>
                <th className='px-4 py-2'>Isi Ajuan</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Balasan</th>
              </tr>
            </thead>
            <tbody>
              {ajuanList.map((ajuan) => (
                <tr key={ajuan.id} className='text-center'>
                  <td className='px-4 py-2 border'>{ajuan.tanggal}</td>
                  <td className='px-4 py-2 border'>{ajuan.perihal}</td>
                  <td className='px-4 py-2 border'>{ajuan.isiAjuan}</td>
                  <td className='p-4 text-center w-32'>
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
                  <td className='px-4 py-2 border'>{ajuan.balasan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListAjuan;

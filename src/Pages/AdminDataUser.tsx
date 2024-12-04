import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileAdmin from '../components/Fragments/ProfileAdmin';
import TabPilihan from '../components/Fragments/TabPilihan';
import PopupEditUser from '../components/Fragments/PopupEditUser';
import CustomTable from '../components/Elements/CustomTable';
import Button from '../components/Elements/Button';

interface User {
  id: string;
  fullName: string;
  phone: number;
  email: string;
  verified: boolean;
  status: string;
  role: string;
}

const AdminDataUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Member');
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string | null>(null); // State untuk menyimpan pesan

  const token = sessionStorage.getItem('token');

  // Fetch data user dari backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8000/list/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUsers(response.data.data);
      console.log('Data user:', response.data.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Gagal mengambil data user.');
    } finally {
      setLoading(false);
    }
  };


  const handleUserEdited = () => {
    fetchUsers();
    setIsEditPopupOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await axios.delete(`http://localhost:8000/delete/user/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          withCredentials: true,
        });
        fetchUsers();
        setMessage('User berhasil dihapus!');
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Gagal menghapus user.');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = ['Nama', 'No Hp', 'Email', 'Status', 'Aksi'];

  const formatTableData = (data: User[]) =>
    data.map((user) => ({
      Nama: user.fullName,
      'No Hp': user.phone,
      Email: user.email,
      Status: (
        <span
          className={`px-2 py-1 rounded ${user.verified
              ? 'bg-green-200 text-green-700'
              : 'bg-red-200 text-gray-700'
            }`}
        >
          {user.verified ? 'Aktif' : 'Belum Verifikasi'}
        </span>
      ),
      Aksi: (
        <div className='flex items-center justify-center space-x-2'>
          <Button variant='deleted' onClick={() => handleDelete(user.id)}>
            Hapus
          </Button>
          <Button variant='primary' onClick={() => {
            setCurrentUser(user);
            setIsEditPopupOpen(true);
          }}>
            Edit
          </Button>
        </div>
      ),
    }));

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Penghuni Kost</h1>
        <ProfileAdmin />
      </div>
      <TabPilihan
        buttons={[
          { label: 'Member', variant: 'primary' },
          { label: 'Admin', variant: 'secondary' },
        ]}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <PopupEditUser
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        user={currentUser}
        onUserEdited={handleUserEdited}
      />
      {message && <p className="text-green-500">{message}</p>} {/* Tampilkan pesan berhasil */}
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CustomTable
          columns={columns}
          data={formatTableData(users)}
          itemsPerPage={5}
        />
      )}
    </div>
  );
};

export default AdminDataUser;
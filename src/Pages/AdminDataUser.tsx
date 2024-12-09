import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProfileAdmin from '../components/Fragments/ProfileAdmin';
import PopupEditUser from '../components/Fragments/PopupEditUser';
import Button from '../components/Elements/Button';
import { useFetchUsers } from '../hooks/useFetchUserData';

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
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const { user, fetchUsers } = useFetchUsers();

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

        // Alert success
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data berhasil dihapus',
          showConfirmButton: false,
          timer: 2000,
        });

        // fetch data user
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Penghuni Kost</h1>
        <ProfileAdmin />
      </div>

      <div className='bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full'>
        <table className='w-full'>
          <thead className='text-center'>
            <tr className='text-gray-500 text-sm border-b'>
              <th className='py-2'>Nama</th>
              <th className='py-2'>Nomor Hp</th>
              <th className='py-2'>Email</th>
              <th className='py-2'>Status</th>
              <th className='py-2'>Aksi</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {user?.map((user: User) => (
              <tr className='text-gray-700'>
                <td className='py-2'>{user.fullName}</td>
                <td className='py-2'>{user.phone}</td>
                <td className='py-2'>{user.email}</td>
                <td className='py-2'>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.verified === true
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.verified === true ? 'Aktif' : 'Belum Verifikasi'}
                  </span>
                </td>
                <td className='py-2 space-x-2'>
                  {/* Button delete */}
                  <Button
                    variant='deleted'
                    onClick={() => handleDelete(user.id)}
                  >
                    Hapus
                  </Button>

                  {/* Button edit */}
                  <Button
                    variant='add'
                    onClick={() => {
                      // setCurrentUser(user);
                      setIsEditPopupOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  {/* Popup edit data */}
                  <PopupEditUser
                    isOpen={isEditPopupOpen}
                    onClose={() => setIsEditPopupOpen(false)}
                    user={user}
                    onUserEdited={handleUserEdited}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDataUser;

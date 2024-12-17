import { useState, useEffect } from 'react';

interface User {
  id: string;
  role: string;
}

interface PopupEditUserProps {
  isOpen: boolean; // Untuk menentukan apakah popup terbuka atau tidak
  onClose: () => void; // Fungsi untuk menutup popup
  user: User | null; // Data pengguna yang akan diedit
  onUserEdited: () => void; // Callback setelah user berhasil diedit
}

const PopupEditUser: React.FC<PopupEditUserProps> = ({
  isOpen,
  onClose,
  user,
  onUserEdited,
}) => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = sessionStorage.getItem('token');

    try {
      const updatedData = { role }; // Data untuk diperbarui

      const response = await fetch(
        `http://localhost:8000/update/user/${user?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message); // Pesan berhasil dari server
        onUserEdited(); // Refresh data pengguna
        onClose(); // Tutup popup
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Gagal memperbarui role user.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-96 p-6 rounded-lg shadow-md relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
        >
          ×
        </button>
        <h2 className='text-2xl font-bold mb-2'>Edit Role User</h2>
        <p className='text-gray-500 mb-4'>
          Perbarui role user sesuai kebutuhan.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditUser;

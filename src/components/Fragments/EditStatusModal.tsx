import { useState } from 'react';
import axios from 'axios';
// import { Ajuan } from './AjuanTable';
import Button from '../Elements/Button';
import { useNavigate } from 'react-router-dom';
import { IRoomComplaint } from '../../interfaces/models/RoomComplaintInterfaces';

interface EditStatusModalProps {
  isOpen: boolean;
  ajuan: IRoomComplaint;
  createdAt: string;
  updatedAt: string;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
}

const EditStatusModal: React.FC<EditStatusModalProps> = ({
  isOpen,
  ajuan,
  onClose,
  onStatusUpdate,
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(ajuan.status || '');

  const handleSave = async () => {
    navigate('/data-ajuan');
    if (!ajuan) return;
    try {
      // Mengirim permintaan PATCH ke server
      await axios.put(
        `http://localhost:8000/complaint/status/${ajuan.id}`,
        { status }, // Body request
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Token dari sessionStorage
          },
          withCredentials: true,
        }
      );
      alert('Status berhasil diperbarui');
      onStatusUpdate(ajuan.id, status);
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal memperbarui status.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-96'>
        <div className='flex justify-between items-center relative'>
          <h2 className='text-xl font-bold '>Edit Status</h2>
          <button
            className='absolute -top-2 -right-3 text-gray-500 hover:text-gray-800 text-3xl mr-2'
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className='mt-4'>
          <label
            htmlFor='status'
            className='block text-sm font-medium text-gray-700'
          >
            Status
          </label>
          <select
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='mt-1 block w-full p-2 border rounded-md'
          >
            <option value=''>Pilih Status</option>
            <option value='Menunggu'>Menunggu</option>
            <option value='Selesai'>Selesai</option>
          </select>
        </div>
        <div className='flex justify-end mt-6 space-x-2'>
          {isOpen && (
            <div>
              <Button variant='detail' onClick={onClose}>
                Batal
              </Button>
              <Button variant='primary' onClick={handleSave}>
                Simpan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;

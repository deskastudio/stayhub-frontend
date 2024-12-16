import { useState } from 'react';
import axios from 'axios';
import Button from '../Elements/Button';
import { Ajuan } from './AjuanTable';
import { useNavigate } from 'react-router-dom';

interface AjuanBalasModalProps {
  ajuan: Ajuan;
  onClose: () => void;
  onResponseUpdate: (id: number, response: string) => void;
}

const AjuanBalasModal: React.FC<AjuanBalasModalProps> = ({
  ajuan,
  onClose,
  onResponseUpdate,
}) => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(ajuan.response || '');
  const handleSave = async () => {
    navigate('/data-ajuan');
    if (!ajuan) return;
    console.log('Ajuan ID:', ajuan.id); // Cek ID yang sedang diproses
    console.log('Tanggapan yang akan dikirim:', response); //
    try {
      // Mengirim permintaan PATCH ke server
      await axios.put(
        `http://localhost:8000/complaint/response/${ajuan.id}`,
        { response },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Token dari sessionStorage
          },
          withCredentials: true,
        }
      );

      alert('Balasan berhasil dikirim');
      onResponseUpdate(ajuan.id, response);
      onClose();
    } catch (error) {
      console.error('Error send response:', error);
      alert('Gagal mengirim balasan');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative'>
        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl mr-2'
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className='text-xl font-bold  mt-4'>Balas Ajuan</h2>
        <form className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'></div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Isi Ajuan
            </label>
            <textarea
              value={ajuan.description}
              readOnly
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              rows={4}
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Tanggapan
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              rows={4}
            />
          </div>

          <div className='flex justify-end mt-6 space-x-2'>
            <Button variant='detail' onClick={onClose}>
              Batal
            </Button>
            <Button variant='primary' onClick={handleSave}>
              Kirim Balasan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanBalasModal;

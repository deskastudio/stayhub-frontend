import React from 'react';
import Button from '../Elements/Button';
import { Ajuan } from './AjuanTable';
import { format } from 'date-fns';

interface AjuanDetailModalProps {
  data: Ajuan;
  onClose: () => void;
}

const AjuanDetailModal: React.FC<AjuanDetailModalProps> = ({
  data,
  onClose,
}) => {
  const formatTanggal = (tanggal: string) => {
    const dateObj = new Date(tanggal);
    if (isNaN(dateObj.getTime())) {
      return ''; // Jika tidak valid, kembalikan string kosong
    }
    return format(dateObj, 'dd/MM/yyyy'); // Memformat tanggal
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

        <h2 className='text-xl font-bold mb-6 mt-4'>Detail Ajuan</h2>
        <form className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Nama Lengkap
              </label>
              <input
                type='text'
                value={data.user?.fullName || 'tidak tersedia'}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                No Kamar
              </label>
              <input
                type='text'
                value={data.room?.name || 'Tidak Tersedia'}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Tanggal
            </label>
            <input
              type='text'
              value={formatTanggal(data.createdAt)} // Ganti 'data.createdAt' jika nama properti tanggalnya berbeda
              readOnly
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Perihal
            </label>
            <input
              type='text'
              value={data.title}
              readOnly
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Isi Ajuan
            </label>
            <textarea
              value={data.description}
              readOnly
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
              rows={4}
            />
          </div>

          <div className='flex justify-end mt-6'>
            <Button variant='detail' onClick={onClose}>
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanDetailModal;

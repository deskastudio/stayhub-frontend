import React, { useState } from 'react';
import Button from '../components/Elements/Button';
import SectionHeader from '../components/Elements/SectionHeader';
import Profile from '../components/Fragments/Profile';
import AjuanModal from '../components/Fragments/AjuanModal';
import { useNavigate } from 'react-router-dom';
import { Ajuan } from './UserListAjuan';

const UserAjuan: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data: Omit<Ajuan, 'id'>) => {
    const currentAjuanList = JSON.parse(
      localStorage.getItem('ajuanList') || '[]'
    );
    const newAjuan = { ...data, id: currentAjuanList.length + 1 }; // Generate id baru
    localStorage.setItem(
      'ajuanList',
      JSON.stringify([...currentAjuanList, newAjuan])
    );

    closeModal(); // Menutup modal setelah submit
    navigate('/list-ajuan'); // Pindah ke halaman ListAjuan setelah submit
  };

  return (
    <div className='p-8 flex-grow'>
      <SectionHeader title='Ajukan Keluhan'>
        <Profile />
      </SectionHeader>

      {/* Tombol untuk membuka modal */}
      <div className='mb-10'>
        <Button variant='add' onClick={openModal}>
          Tambah Ajuan
        </Button>
      </div>
      <AjuanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />

      {/* Proses Pengajuan Keluhan */}
      <div className='flex justify-center items-center py-10'>
        <div className='bg-blue-50 p-8 rounded-lg shadow-md w-full max-w-4xl'>
          <h2 className='text-center text-3xl font-bold mb-20'>
            Proses Pengajuan Keluhan
          </h2>
          <div className='flex justify-around items-center gap-2'>
            {/* Step 1 */}
            <div className='flex flex-col items-center text-center'>
              <div className='bg-[#226597] text-white rounded-full w-24 h-24 flex items-center justify-center mb-2'>
                <img
                  src='./public/icon/masukkanKeluhan.svg'
                  alt='Tuliskan Ajuan'
                  className='w-18 h-18'
                />
              </div>
              <p className='text-xl font-bold'>Tuliskan Ajuan Keluhan</p>
            </div>
            {/* Step 2 */}
            <div className='flex flex-col items-center text-center'>
              <div className='bg-[#226597] text-white rounded-full w-24 h-24 flex items-center justify-center mb-2'>
                <img
                  src='./public/icon/tindahLanjutKeluhan.svg'
                  alt='Tuliskan Ajuan'
                  className='w-18 h-18'
                />
              </div>
              <p className='text-xl font-bold'>Tindak Lanjut</p>
            </div>
            {/* Step 3 */}
            <div className='flex flex-col items-center text-center'>
              <div className='bg-[#226597] text-white rounded-full w-24 h-24 flex items-center justify-center mb-2'>
                <img
                  src='./public/icon/KeluhanDikirim.svg'
                  alt='Tuliskan Ajuan'
                  className='w-18 h-18'
                />
              </div>
              <p className='text-xl font-bold'>Ajuan Keluhan Selesai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAjuan;

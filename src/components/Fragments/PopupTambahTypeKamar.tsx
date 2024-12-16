import React, { useState, useEffect } from 'react';
import Button from '../Elements/Button';

interface Fasilitas {
  id: string;
  nama: string;
}

interface TypeKamar {
  id?: string;
  namaTipe: string;
  fasilitas: Fasilitas[];
  deskripsi: string;
  harga: number;
}

interface PopupTambahTypeKamarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TypeKamar) => void;
  currentData: TypeKamar | null;
  fasilitasData: Fasilitas[]; // Data fasilitas yang tersedia
}

const PopupTambahTypeKamar: React.FC<PopupTambahTypeKamarProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentData,
  fasilitasData,
}) => {
  const [namaTipe, setNamaTipe] = useState('');
  const [fasilitas, setFasilitas] = useState<string[]>([]); // Simpan ID fasilitas
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState(0);

  // Set data awal saat popup dibuka
  useEffect(() => {
    if (currentData) {
      setNamaTipe(currentData.namaTipe);
      setFasilitas(currentData.fasilitas.map((item) => item.id)); // Gunakan ID fasilitas
      setDeskripsi(currentData.deskripsi);
      setHarga(currentData.harga);
    } else {
      setNamaTipe('');
      setFasilitas([]);
      setDeskripsi('');
      setHarga(0);
    }
  }, [currentData]);

  // Tambah atau hapus fasilitas
  const toggleFasilitas = (fasilitasId: string) => {
    setFasilitas(
      (prev) =>
        prev.includes(fasilitasId)
          ? prev.filter((id) => id !== fasilitasId) // Hapus ID fasilitas jika sudah ada
          : [...prev, fasilitasId] // Tambahkan ID fasilitas jika belum ada
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaTipe || !fasilitas.length || !deskripsi || harga <= 0) {
      alert('Semua data harus diisi!');
      return;
    }

    onSubmit({
      id: currentData?.id,
      namaTipe,
      fasilitas: fasilitas.map((id) => ({
        id,
        nama: fasilitasData.find((item) => item.id === id)?.nama || '',
      })), // Kirim ID dan nama fasilitas
      deskripsi,
      harga,
    });
  };

  useEffect(() => {
    console.log(
      'Data fasilitas diterima di PopupTambahTypeKamar:',
      fasilitasData
    );
  }, [fasilitasData]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>
            {currentData ? 'Edit' : 'Tambah'} Tipe Kamar
          </h2>
          <Button variant='plain' onClick={onClose}>
            ×
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Nama Tipe Kamar */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Nama Tipe Kamar</label>
            <input
              type='text'
              value={namaTipe}
              onChange={(e) => setNamaTipe(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          {/* Fasilitas */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Fasilitas</label>
            <div className='flex flex-wrap gap-2'>
              {fasilitasData && fasilitasData.length > 0 ? (
                fasilitasData.map((fasilitasItem) => (
                  <Button
                    key={fasilitasItem.id}
                    variant={
                      fasilitas.includes(fasilitasItem.id)
                        ? 'primary'
                        : 'secondary'
                    }
                    onClick={() => toggleFasilitas(fasilitasItem.id)}
                  >
                    {fasilitasItem.nama}{' '}
                    {/* Gunakan `nama` untuk menampilkan */}
                  </Button>
                ))
              ) : (
                <p>Fasilitas tidak ditemukan.</p>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          {/* Harga */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Harga</label>
            <input
              type='number'
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          {/* Tombol Aksi */}
          <div className='flex justify-end'>
            <Button type='submit' variant='primary'>
              {currentData ? 'Update' : 'Tambah'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahTypeKamar;

import { useState, useEffect } from 'react';
import Button from '../Elements/Button';
import { IRoomType } from '../../interfaces/models/RoomTypeInterface';
import { IRoomFacility } from '../../interfaces/models/RoomFacilityInterface';

interface PopupTambahTypeKamarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IRoomType) => void;
  currentData: IRoomType | null;
  fasilitasData: IRoomFacility[];
}

const PopupTambahTypeKamar: React.FC<PopupTambahTypeKamarProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentData,
  fasilitasData,
}) => {
  const [namaTipe, setNamaTipe] = useState('');
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState(0);

  // Set data awal saat popup dibuka
  useEffect(() => {
    if (currentData) {
      setNamaTipe(currentData.name);
      setFasilitas(currentData.facility.map((item) => item.id));
      setDeskripsi(currentData.description);
      setHarga(currentData.cost);
    } else {
      setNamaTipe('');
      setFasilitas([]);
      setDeskripsi('');
      setHarga(0);
    }
  }, [currentData]);

  // Tambah atau hapus fasilitas
  const toggleFasilitas = (fasilitasId: string) => {
    setFasilitas((prev) =>
      prev.includes(fasilitasId)
        ? prev.filter((id) => id !== fasilitasId)
        : [...prev, fasilitasId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaTipe || !fasilitas.length || !deskripsi || harga <= 0) {
      alert('Semua data harus diisi!');
      return;
    }

    if (!currentData?.id) {
      alert('ID tipe kamar tidak ditemukan!');
      return;
    }

    onSubmit({
      id: currentData?.id,
      name: namaTipe,
      facility: fasilitas.map((id) => {
        const data = fasilitasData.find((item) => item.id === id);
        return {
          id,
          name: data?.name || '',
        };
      }),
      description: deskripsi,
      cost: harga,
      createdAt: currentData.createdAt,
      updatedAt: currentData.updatedAt,
    });

    onClose();
  };

  return (
    <>
      {isOpen && (
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
                        {fasilitasItem.name}
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
      )}
    </>
  );
};

export default PopupTambahTypeKamar;

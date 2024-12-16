import { useState, useEffect, FormEvent } from 'react';
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

interface PopupEditTypeKamarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TypeKamar) => void;
  currentData: TypeKamar | null;
  fasilitasData: Fasilitas[];
}

const PopupEditTypeKamar: React.FC<PopupEditTypeKamarProps> = ({
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

  useEffect(() => {
    if (currentData) {
      setNamaTipe(currentData.namaTipe);
      setFasilitas(currentData.fasilitas.map((item) => item.nama));
      setDeskripsi(currentData.deskripsi);
      setHarga(currentData.harga);
    } else {
      setNamaTipe('');
      setFasilitas([]);
      setDeskripsi('');
      setHarga(0);
    }
  }, [currentData]);

  const toggleFasilitas = (fasilitasNama: string) => {
    setFasilitas((prev) =>
      prev.includes(fasilitasNama)
        ? prev.filter((item) => item !== fasilitasNama)
        : [...prev, fasilitasNama]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentData) {
      alert('Data tidak tersedia untuk diupdate.');
      return;
    }

    // Update only the fields that have changed
    const updatedData: TypeKamar = {
      id: currentData.id,
      namaTipe: currentData.namaTipe, // Keep the old 'namaTipe' if it was not changed
      fasilitas: fasilitasData.filter((f) => fasilitas.includes(f.nama)),
      deskripsi: deskripsi || currentData.deskripsi, // Update deskripsi only if it's changed
      harga: harga || currentData.harga, // Update harga only if it's changed
    };

    onSubmit(updatedData);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Edit Tipe Kamar</h2>
          <Button variant='plain' onClick={onClose}>
            ×
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Nama Tipe Kamar</label>
            <input
              type='text'
              value={namaTipe}
              onChange={(e) => setNamaTipe(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          <div className='mb-4'>
            <label className='block font-bold mb-2'>Fasilitas</label>
            <div className='flex flex-wrap gap-2'>
              {fasilitasData.map((fasilitasItem) => (
                <Button
                  key={fasilitasItem.id}
                  variant={
                    fasilitas.includes(fasilitasItem.nama)
                      ? 'primary'
                      : 'secondary'
                  }
                  onClick={() => toggleFasilitas(fasilitasItem.nama)}
                >
                  {fasilitasItem.nama}
                </Button>
              ))}
            </div>
          </div>

          <div className='mb-4'>
            <label className='block font-bold mb-2'>Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Harga</label>
            <input
              type='number'
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
              className='w-full px-3 py-2 border rounded-lg'
              min='0'
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <Button variant='secondary' onClick={onClose} type='button'>
              Cancel
            </Button>
            <Button type='submit' variant='primary'>
              Update Tipe Kamar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditTypeKamar;

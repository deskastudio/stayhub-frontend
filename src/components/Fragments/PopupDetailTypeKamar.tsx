import Button from '../Elements/Button';

// Tipe data untuk tipe kamar
interface Fasilitas {
  id: string;
  nama: string;
}

interface TypeKamar {
  id: string;
  namaTipe: string;
  fasilitas: Fasilitas[];
  deskripsi: string;
  harga: number;
}

interface PopupDetailTypeKamarProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: TypeKamar | null;
}

const PopupDetailTypeKamar: React.FC<PopupDetailTypeKamarProps> = ({
  isOpen,
  onClose,
  currentData,
}) => {
  if (!isOpen || !currentData) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Detail Tipe Kamar</h2>
          <Button variant='plain' onClick={onClose}>
            ×
          </Button>
        </div>
        <div className='mb-4'>
          <label className='block font-bold mb-2'>Nama Tipe Kamar</label>
          <p>{currentData.namaTipe}</p>
        </div>
        <div className='mb-4'>
          <label className='block font-bold mb-2'>Fasilitas</label>
          <p>
            {currentData.fasilitas
              .map((fasilitas) => fasilitas.nama)
              .join(', ')}
          </p>
        </div>
        <div className='mb-4'>
          <label className='block font-bold mb-2'>Deskripsi</label>
          <p>{currentData.deskripsi}</p>
        </div>
        <div className='mb-4'>
          <label className='block font-bold mb-2'>Harga</label>
          <p>Rp {currentData.harga.toLocaleString()}</p>
        </div>
        <div className='flex justify-end space-x-2'>
          <Button variant='secondary' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailTypeKamar;


import Button from "../Elements/Button";

interface TypeKamar {
  id: string;
  namaTipe: string;
  fasilitas: { nama: string }[];
  deskripsi: string;
  harga: number;
}

interface PopupDetailTypeKamarProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: TypeKamar | null;
}

const PopupDetailTypeKamar: React.FC<PopupDetailTypeKamarProps> = ({ isOpen, onClose, currentData }) => {
  if (!isOpen || !currentData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Detail Tipe Kamar</h2>
          <Button variant="plain" onClick={onClose}>×</Button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Nama Tipe Kamar</h3>
          <p>{currentData.namaTipe}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Fasilitas</h3>
          <p>{currentData.fasilitas.map((f) => f.nama).join(", ")}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Deskripsi</h3>
          <p>{currentData.deskripsi}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Harga</h3>
          <p>Rp {currentData.harga.toLocaleString()}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailTypeKamar;

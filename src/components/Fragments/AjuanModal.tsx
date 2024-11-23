
interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AjuanModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Keluhan dikirim!");
    onClose(); // Tutup modal setelah submit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Pengajuan Keluhan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Masukkan email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">No Kamar</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Masukkan no kamar"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tanggal</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Perihal</label>
            <select className="w-full border rounded px-3 py-2">
              <option value="Fasilitas">Fasilitas</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Isi Ajuan</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Masukkan keluhanmu"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-200 px-4 py-2 rounded"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanModal;

import React from "react";

interface DetailAjuanModalProps {
  isOpen: boolean;
  onClose: () => void;
  ajuan: {
    namaLengkap: string;
    noKamar: string;
    tanggal: string;
    perihal: string;
    isiAjuan: string;
  } | null;
}

const DetailAjuanModal: React.FC<DetailAjuanModalProps> = ({ isOpen, onClose, ajuan }) => {
  if (!isOpen || !ajuan) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Tambahkan latar belakang semi-transparan */}
      <div className="bg-gray-500 bg-opacity-75 fixed inset-0" />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        {" "}
        {/* z-10 agar modal muncul di atas overlay */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold mt-7">Detail Ajuan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl" aria-label="Tutup">
            &times;
          </button>
        </div>
        <form className="space-y-4">
          <div className="flex justify-between">
            <div className="flex-1 mr-2">
              <label className="block text-gray-700 font-medium">Nama Lengkap:</label>
              <input type="text" value={ajuan.namaLengkap} readOnly className="w-full border p-2 rounded" />
            </div>
            <div className="flex-1 ml-2">
              <label className="block text-gray-700 font-medium">No Kamar:</label>
              <input type="text" value={ajuan.noKamar} readOnly className="w-full border p-2 rounded" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Tanggal:</label>
            <input type="text" value={ajuan.tanggal} readOnly className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Perihal:</label>
            <input type="text" value={ajuan.perihal} readOnly className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Isi Ajuan:</label>
            <textarea value={ajuan.isiAjuan} readOnly className="w-full border p-2 rounded" rows={4} />
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailAjuanModal;

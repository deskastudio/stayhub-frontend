import React, { useState } from "react";

interface HapusAjuanModalProps {
  isOpen: boolean;
  onClose: () => void;
  nama: string; // Nama yang akan ditampilkan
  onConfirm: (nama: string) => void; // Fungsi untuk mengeksekusi aksi hapus
}

const HapusAjuanModal: React.FC<HapusAjuanModalProps> = ({ isOpen, onClose, nama, onConfirm }) => {
  const [namaLengkap, setNamaLengkap] = useState(nama); // State untuk nama lengkap yang diinputkan

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(namaLengkap); // Panggil fungsi onConfirm dengan nama yang diinputkan
    setNamaLengkap(""); // Reset input nama setelah konfirmasi
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 fixed inset-0" />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold">Hapus Ajuan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl" aria-label="Tutup">
            &times;
          </button>
        </div>
        <p className="text-gray-700 mb-4">Yakin ingin menghapus ajuan ini?</p>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold" htmlFor="namaLengkap">
            Pengajuan dari
          </label>
          <input type="text" id="namaLengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-3 py-2 rounded">
            Batal
          </button>
          <button onClick={handleConfirm} className="bg-red-700 text-white px-3 py-2 rounded">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default HapusAjuanModal;

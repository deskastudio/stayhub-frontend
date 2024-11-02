import React, { useState } from "react";

interface AjuanResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  nama: string;
  noKamar: string;
  isiAjuan: string; // Misalnya: "AC rusak"
}

const AjuanResponseModal: React.FC<AjuanResponseModalProps> = ({ isOpen, onClose, nama, noKamar, isiAjuan }) => {
  const [tanggapan, setTanggapan] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setTanggapan(""); // Reset tanggapan saat modal ditutup
    onClose();
  };

  const handleSend = () => {
    console.log("Tanggapan dikirim:", tanggapan);
    // Logika untuk mengirim tanggapan, misalnya panggil API
    handleClose(); // Tutup modal setelah mengirim
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-1/4 p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold mt-7">Balas Ajuan</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-3xl" aria-label="Tutup">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700">Nama Lengkap</label>
              <input type="text" value={nama} readOnly className="w-full border p-2 rounded" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700">No Kamar</label>
              <input type="text" value={noKamar} readOnly className="w-full border p-2 rounded" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Isi Ajuan</label>
            <textarea value={isiAjuan} readOnly className="w-full border p-2 rounded" rows={3} />
          </div>
          <div>
            <label className="block text-gray-700">Tanggapan</label>
            <textarea value={tanggapan} onChange={(e) => setTanggapan(e.target.value)} placeholder="Masukkan tanggapan" className="w-full border p-2 rounded" rows={3} />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button onClick={handleClose} className="bg-gray-300 text-gray-700 px-3 py-2 rounded">
            Batal
          </button>
          <button onClick={handleSend} className="bg-primary text-white px-3 py-2 rounded">
            Kirim Balasan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AjuanResponseModal;

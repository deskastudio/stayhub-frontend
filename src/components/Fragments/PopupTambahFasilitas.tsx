import React, { useState } from "react";

interface PopupTambahFasilitasProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { fasilitas: string; jumlah: number; dipakai: number; gambar: File | null }) => void;
}

const PopupTambahFasilitas: React.FC<PopupTambahFasilitasProps> = ({ isOpen, onClose, onSubmit }) => {
  const [fasilitas, setFasilitas] = useState("");
  const [jumlah, setJumlah] = useState<number | string>("");
  const [dipakai, setDipakai] = useState<number | string>("");
  const [gambar, setGambar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fasilitas || !jumlah || !dipakai) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    onSubmit({
      fasilitas,
      jumlah: Number(jumlah),
      dipakai: Number(dipakai),
      gambar,
    });
    onClose(); // Tutup popup setelah submit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Menambahkan Fasilitas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-gray-500">Mohon isi dengan fasilitas yang ingin ditambahkan</p>
          
          {/* Input Fasilitas */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Fasilitas</label>
            <input
              type="text"
              value={fasilitas}
              onChange={(e) => setFasilitas(e.target.value)}
              placeholder="Masukkan Fasilitas"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Input Jumlah */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Jumlah</label>
            <input
              type="number"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Jumlah Barang"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Input Dipakai */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Dipakai</label>
            <input
              type="number"
              value={dipakai}
              onChange={(e) => setDipakai(e.target.value)}
              placeholder="Jumlah Barang yang Dipakai"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Input Gambar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Upload Gambar</label>
            <input
              type="file"
              onChange={(e) => setGambar(e.target.files ? e.target.files[0] : null)}
              className="w-full px-3 py-2 border border-dashed rounded-lg focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Tambah Fasilitas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahFasilitas;

import React, { useState } from "react";

// Definisikan tipe untuk form data
interface FormData {
  perihal: string;
  status: string;
  tanggal: string;
  aksi: string;
}

interface PopupFormProps {
  onClose: () => void; // Fungsi untuk menutup pop-up
  onSubmit: (formData: FormData) => void; // Fungsi untuk mengirim data
}

const PopupFormAjuan: React.FC<PopupFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    perihal: "",
    status: "",
    tanggal: "",
    aksi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Kirim data form ke fungsi onSubmit
    onClose(); // Tutup pop-up setelah pengiriman
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Pengajuan Keluhan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Perihal</label>
            <select
              name="perihal"
              value={formData.perihal}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            >
              <option value="" disabled>
                Pilih Perihal
              </option>
              <option value="Fasilitas">Fasilitas</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Layanan">Layanan</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            >
              <option value="" disabled>
                Pilih Status
              </option>
              <option value="Menunggu">Menunggu</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Aksi</label>
            <input
              type="text"
              name="aksi"
              value={formData.aksi}
              onChange={handleChange}
              placeholder="Masukkan tindakan yang akan dilakukan"
              className="border rounded w-full px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupFormAjuan;

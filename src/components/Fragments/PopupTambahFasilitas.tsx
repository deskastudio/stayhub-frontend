import React, { useState } from "react";
import axios from "axios";
import Button from "../Elements/Button";

interface PopupTambahFasilitasProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fasilitas: string) => void;
}

const PopupTambahFasilitas: React.FC<PopupTambahFasilitasProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [fasilitas, setFasilitas] = useState("");
  const token = sessionStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (!fasilitas.trim()) {
      alert("Nama fasilitas tidak boleh kosong!");
      return;
    }

    try {
      // Kirim nama fasilitas ke backend menggunakan API POST
      const response = await axios.post(
        "http://localhost:8000/facility/add",
        { name: fasilitas.trim() }, // Data yang dikirim ke backend
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token harus disertakan di header
          },
          withCredentials: true, // Jika Anda menggunakan cookies
        }
      );

      if (response.status === 201) {
        // Jika berhasil, kirim data ke parent untuk di-refresh
        alert("Fasilitas berhasil ditambahkan!");
        onSubmit(fasilitas.trim());
        setFasilitas(""); // Reset input setelah berhasil
        onClose(); // Tutup popup
      } else {
        alert("Gagal menambahkan fasilitas, coba lagi.");
      }
    } catch (error) {
      console.error("Error adding fasilitas:", error);

      // Tangani error dengan lebih detail
      if (axios.isAxiosError(error)) {
        alert(`Gagal menambahkan fasilitas: ${error.response?.data?.message || error.message}`);
      } else {
        alert("Gagal menambahkan fasilitas: Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Menambahkan Fasilitas</h2>
          <Button variant="plain" onClick={onClose}>
            ×
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-gray-500">
            Masukkan nama fasilitas yang ingin ditambahkan.
          </p>

          {/* Input Fasilitas */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Nama Fasilitas</label>
            <input
              type="text"
              value={fasilitas}
              onChange={(e) => setFasilitas(e.target.value)}
              placeholder="Masukkan nama fasilitas"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Tambah Fasilitas
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahFasilitas;

import React, { useState } from "react";
import axios from "axios";

// Definisi tipe untuk properti komponen
interface PopupTambahKamarProps {
  isOpen: boolean; // Menentukan apakah popup terbuka atau tidak
  onClose: () => void; // Callback untuk menutup popup
  onKamarAdded: () => void; // Callback untuk refresh data setelah kamar ditambahkan
}

const PopupTambahKamar: React.FC<PopupTambahKamarProps> = ({
  isOpen,
  onClose,
  onKamarAdded,
}) => {
  // State untuk input data kamar
  const [noKamar, setNoKamar] = useState<string>("");
  const [typeKamar, setTypeKamar] = useState<"Silver" | "Gold" | "Platinum">(
    "Silver"
  );
  const [cost, setCost] = useState<number>(0);
  const [statusKamar, setStatusKamar] = useState<"Tersedia" | "Tidak Tersedia">(
    "Tersedia"
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validasi input
      if (!noKamar.trim()) {
        alert("Nomor kamar tidak boleh kosong!");
        setLoading(false);
        return;
      }
      if (cost < 0) {
        alert("Biaya kamar tidak boleh kurang dari 0!");
        setLoading(false);
        return;
      }

      // Kirim data ke backend
      await axios.post("http://localhost:8000/room/add", {
        name: noKamar,
        type: typeKamar,
        cost,
        status: statusKamar,
      });

      alert("Kamar berhasil ditambahkan!");
      onKamarAdded(); // Refresh data di parent
      onClose(); // Tutup popup
    } catch (error: unknown) {
      // Tangani error dengan tipe lebih aman
      if (axios.isAxiosError(error)) {
        console.error(
          "Error adding room:",
          error.response?.data || error.message
        );
        alert(
          `Gagal menambahkan kamar: ${
            error.response?.data?.message || "Terjadi kesalahan, coba lagi."
          }`
        );
      } else {
        console.error("Unknown error:", error);
        alert("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Jika popup tidak terbuka, jangan render apa pun
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tambah Kamar</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">No Kamar</label>
            <input
              type="text"
              value={noKamar}
              onChange={(e) => setNoKamar(e.target.value)}
              placeholder="Masukkan nomor kamar"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Type Kamar</label>
            <select
              value={typeKamar}
              onChange={(e) =>
                setTypeKamar(e.target.value as "Silver" | "Gold" | "Platinum")
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Biaya Kamar</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              placeholder="Masukkan biaya kamar"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Status Kamar</label>
            <select
              value={statusKamar}
              onChange={(e) =>
                setStatusKamar(
                  e.target.value as "Tersedia" | "Tidak Tersedia"
                )
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Tidak Tersedia">Tidak Tersedia</option>
            </select>
          </div>
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Tambah Kamar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahKamar;

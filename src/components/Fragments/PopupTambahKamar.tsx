import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Elements/Button";

// Tipe data untuk properti komponen
interface PopupTambahKamarProps {
  isOpen: boolean; // Menentukan apakah popup terbuka atau tidak
  onClose: () => void; // Callback untuk menutup popup
  onKamarAdded: () => void; // Callback untuk refresh data setelah kamar ditambahkan
}

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

const PopupTambahKamar: React.FC<PopupTambahKamarProps> = ({
  isOpen,
  onClose,
  onKamarAdded,
}) => {
  const [noKamar, setNoKamar] = useState<string>(""); // Nomor Kamar
  const [typeKamar, setTypeKamar] = useState<TypeKamar | null>(null); // Data tipe kamar yang dipilih
  const [statusKamar, setStatusKamar] = useState<"Tersedia" | "Tidak Tersedia">(
    "Tersedia"
  );
  const [gambarKamar, setGambarKamar] = useState<FileList | null>(null); // Untuk gambar lebih dari satu
  const [tipeKamarList, setTipeKamarList] = useState<TypeKamar[]>([]); // Menyimpan data tipe kamar yang ada

  // Ambil data tipe kamar dari backend
  useEffect(() => {
    const fetchTipeKamar = async () => {
      try {
        const response = await axios.get("http://localhost:8000/type-kamar");
        setTipeKamarList(response.data.data);
      } catch (error) {
        console.error("Error fetching type kamar:", error);
      }
    };

    fetchTipeKamar();
  }, []);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noKamar.trim() || !typeKamar || !gambarKamar || gambarKamar.length === 0) {
      alert("Data tidak lengkap, pastikan semua input terisi!");
      return;
    }

    const formData = new FormData();
    formData.append("name", noKamar);
    formData.append("type", typeKamar.namaTipe);
    formData.append("status", statusKamar);

    // Menambahkan gambar ke formData
    Array.from(gambarKamar).forEach((file) => {
      formData.append("gambar", file);
    });

    try {
      await axios.post("http://localhost:8000/room/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Kamar berhasil ditambahkan!");
      onKamarAdded(); // Refresh data di parent
      onClose(); // Tutup popup
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Gagal menambahkan kamar.");
    }
  };

  // Jika popup tidak terbuka, jangan render apa pun
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tambah Kamar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
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

          {/* Pilihan tipe kamar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Tipe Kamar</label>
            <div className="flex flex-wrap gap-2">
              {tipeKamarList.map((item) => (
                <Button
                  key={item.id}
                  variant={typeKamar?.id === item.id ? "primary" : "secondary"}
                  onClick={() => setTypeKamar(item)}
                >
                  {item.namaTipe}
                </Button>
              ))}
            </div>
          </div>

          {/* Status kamar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Status Kamar</label>
            <select
              value={statusKamar}
              onChange={(e) => setStatusKamar(e.target.value as "Tersedia" | "Tidak Tersedia")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Tidak Tersedia">Tidak Tersedia</option>
            </select>
          </div>

          {/* Input Gambar Kamar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Gambar Kamar</label>
            <input
              type="file"
              multiple
              onChange={(e) => setGambarKamar(e.target.files)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
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
            >
              Tambah Kamar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahKamar;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Tipe data untuk properti komponen
interface PopupTambahKamarProps {
  isOpen: boolean; // Menentukan apakah popup terbuka atau tidak
  onClose: () => void; // Callback untuk menutup popup
  onKamarAdded: () => void; // Callback untuk refresh data setelah kamar ditambahkan
  onAddRoom: (newRoom: FormData) => void; // Tambahkan properti ini
}

interface TypeKamar {
  id: string;
  namaTipe: string;
}

const PopupTambahKamar: React.FC<PopupTambahKamarProps> = ({
  isOpen,
  onClose,
  onKamarAdded,
  onAddRoom, // Tambahkan properti ini
}) => {
  const [noKamar, setNoKamar] = useState<string>(""); // Nomor Kamar
  const [typeKamar, setTypeKamar] = useState<string>(""); // ID tipe kamar yang dipilih
  const [statusKamar, setStatusKamar] = useState<"Tersedia" | "Tidak Tersedia">(
    "Tersedia"
  );
  const [gambarKamar, setGambarKamar] = useState<FileList | null>(null); // Untuk gambar lebih dari satu
  const [tipeKamarList, setTipeKamarList] = useState<TypeKamar[]>([]); // Menyimpan data tipe kamar yang ada

  const token = sessionStorage.getItem('token');

  // Ambil data tipe kamar dari backend
  useEffect(() => {
    const fetchTipeKamar = async () => {
      try {
        const response = await axios.get("http://localhost:8000/type", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("Response dari API tipe kamar:", response.data.data); // Log data dari backend

        const transformedData = response.data.data.map((item: any) => ({
          id: item.id,
          namaTipe: item.name, // Sesuaikan dengan backend
        }));

        setTipeKamarList(transformedData);
      } catch (error) {
        console.error("Error fetching type kamar:", error);
      }
    };

    fetchTipeKamar();
  }, [token]);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!noKamar || !typeKamar || !gambarKamar || gambarKamar.length === 0) {
      alert("Pastikan semua data terisi!");
      return;
    }
  
    const formData = new FormData();
    formData.append('name', noKamar); // Nama kamar
    formData.append('type', typeKamar); // ID tipe kamar
    formData.append('status', statusKamar); // Status kamar
    Array.from(gambarKamar).forEach((file) => formData.append('roomImages', file)); // Key harus 'roomImages'
  
    onAddRoom(formData); // Panggil fungsi ini untuk menambahkan kamar
    onKamarAdded(); // Refresh data
    onClose(); // Tutup popup
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
        <form onSubmit={handleSubmit} method="post">
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
            <select
              value={typeKamar}
              onChange={(e) => setTypeKamar(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>
                Pilih tipe kamar
              </option>
              {tipeKamarList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.namaTipe}
                </option>
              ))}
            </select>
          </div>

          {/* Status kamar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Status Kamar</label>
            <select
              value={statusKamar}
              onChange={(e) =>
                setStatusKamar(e.target.value as "Tersedia" | "Tidak Tersedia")
              }
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
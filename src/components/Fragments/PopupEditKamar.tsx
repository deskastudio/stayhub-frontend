import React, { useState, useEffect } from "react";
import Button from "../Elements/Button";
import axios from "axios";

// Tipe data untuk tipe kamar
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

interface Room {
  id: string;
  name: string;
  type: string;
  cost: number;
  status: "Tersedia" | "Tidak Tersedia";
}

interface PopupEditKamarProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: Room | null;
  typeKamarData: TypeKamar[]; // Data tipe kamar yang tersedia
}

const PopupEditKamar: React.FC<PopupEditKamarProps> = ({
  isOpen,
  onClose,
  currentData,
  typeKamarData,
}) => {
  const [noKamar, setNoKamar] = useState<string>("");
  const [typeKamar, setTypeKamar] = useState<string>("");
  const [statusKamar, setStatusKamar] = useState<"Tersedia" | "Tidak Tersedia">("Tersedia");

  useEffect(() => {
    if (currentData) {
      setNoKamar(currentData.name);
      setTypeKamar(currentData.type);
      setStatusKamar(currentData.status);
    } else {
      setNoKamar("");
      setTypeKamar("");
      setStatusKamar("Tersedia");
    }
  }, [currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noKamar.trim() || !typeKamar) {
      alert("Nama kamar dan tipe kamar harus diisi!");
      return;
    }

    try {
      // Kirim data kamar yang telah diubah ke backend
      const updatedRoom: Room = {
        id: currentData?.id || "",
        name: noKamar,
        type: typeKamar,
        cost: currentData?.cost || 0,
        status: statusKamar,
      };

      // Mengirim permintaan PUT untuk memperbarui data kamar
      await axios.put(`http://localhost:8000/room/update/${currentData?.id}`, updatedRoom);
      alert("Kamar berhasil diperbarui!");
      onClose(); // Menutup popup setelah berhasil memperbarui
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Gagal memperbarui kamar.");
    }
  };

  if (!isOpen || !currentData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Kamar</h2>
          <Button variant="plain" onClick={onClose}>
            ×
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">No Kamar</label>
            <input
              type="text"
              value={noKamar}
              onChange={(e) => setNoKamar(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Pilihan Tipe Kamar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Tipe Kamar</label>
            <select
              value={typeKamar}
              onChange={(e) => setTypeKamar(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {typeKamarData.map((type) => (
                <option key={type.id} value={type.namaTipe}>
                  {type.namaTipe}
                </option>
              ))}
            </select>
          </div>

          {/* Status Kamar */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Status Kamar</label>
            <select
              value={statusKamar}
              onChange={(e) => setStatusKamar(e.target.value as "Tersedia" | "Tidak Tersedia")}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Tidak Tersedia">Tidak Tersedia</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Kamar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditKamar;

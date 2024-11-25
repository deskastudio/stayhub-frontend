import React, { useState, useEffect } from "react";
import Button from "../Elements/Button";

// Tipe data untuk tipe kamar
interface Fasilitas {
  id: string;
  nama: string;
}

interface TypeKamar {
  id?: string;
  namaTipe: string;
  fasilitas: Fasilitas[];
  deskripsi: string;
  harga: number;
}

interface PopupTambahTypeKamarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TypeKamar) => void;
  currentData: TypeKamar | null;
  fasilitasData: Fasilitas[]; // Data fasilitas yang tersedia
}

const PopupTambahTypeKamar: React.FC<PopupTambahTypeKamarProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentData,
  fasilitasData,
}) => {
  const [namaTipe, setNamaTipe] = useState("");
  const [fasilitas, setFasilitas] = useState<string[]>([]); // Fasilitas yang dipilih
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);

  useEffect(() => {
    if (currentData) {
      setNamaTipe(currentData.namaTipe);
      setFasilitas(currentData.fasilitas.map((item) => item.nama));
      setDeskripsi(currentData.deskripsi);
      setHarga(currentData.harga);
    } else {
      setNamaTipe("");
      setFasilitas([]);
      setDeskripsi("");
      setHarga(0);
    }
  }, [currentData]);

  const toggleFasilitas = (fasilitasNama: string) => {
    setFasilitas((prev) =>
      prev.includes(fasilitasNama)
        ? prev.filter((item) => item !== fasilitasNama)
        : [...prev, fasilitasNama]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaTipe || !fasilitas.length || !deskripsi || harga <= 0) {
      alert("Semua data harus diisi!");
      return;
    }

    // Format fasilitas menjadi array of objects
    const fasilitasData = fasilitas.map((f) => ({ id: f, nama: f }));

    onSubmit({
      id: currentData?.id,
      namaTipe,
      fasilitas: fasilitasData,
      deskripsi,
      harga,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{currentData ? "Edit" : "Tambah"} Tipe Kamar</h2>
          <Button variant="plain" onClick={onClose}>
            ×
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Nama Tipe Kamar</label>
            <input
              type="text"
              value={namaTipe}
              onChange={(e) => setNamaTipe(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Fasilitas sebagai tombol */}
          <div className="mb-4">
            <label className="block font-bold mb-2">Fasilitas</label>
            <div className="flex flex-wrap gap-2">
              {fasilitasData.map((fasilitasItem) => (
                <Button
                  key={fasilitasItem.id}
                  variant={fasilitas.includes(fasilitasItem.nama) ? "primary" : "secondary"}
                  onClick={() => toggleFasilitas(fasilitasItem.nama)}
                >
                  {fasilitasItem.nama}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Harga</label>
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {currentData ? "Update" : "Tambah"} Tipe Kamar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahTypeKamar;

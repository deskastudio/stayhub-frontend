import React, { useState } from "react";
import Button from "../components/Elements/Button";

const AdminTypeKamarTambah: React.FC = () => {
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [jumlah, setJumlah] = useState<number>(1);

  const toggleFasilitas = (fasilitasItem: string) => {
    setFasilitas((prev) =>
      prev.includes(fasilitasItem)
        ? prev.filter((item) => item !== fasilitasItem)
        : [...prev, fasilitasItem]
    );
  };

  const handleJumlahChange = (change: number) => {
    setJumlah((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="min-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <form>
        <div className="mb-4">
          <label className="block font-bold mb-2">Type Kamar</label>
          <input
            type="text"
            placeholder="Masukkan type kamar"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Fasilitas</label>
          <div className="flex space-x-2">
            {["Kasur", "Dapur", "WIFI", "AC"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleFasilitas(item)}
                className={`px-4 py-2 rounded-full ${
                  fasilitas.includes(item)
                    ? "bg-primary-dark text-white"
                    : "border border-primary-dark text-primary-dark"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Jumlah</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleJumlahChange(-1)}
              className="px-3 py-2 border border-gray-400 rounded-lg"
            >
              -
            </button>
            <span className="px-3 py-2 border border-gray-400 rounded-lg">
              {jumlah}
            </span>
            <button
              type="button"
              onClick={() => handleJumlahChange(1)}
              className="px-3 py-2 border border-gray-400 rounded-lg"
            >
              +
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Harga</label>
          <input
            type="text"
            placeholder="Masukkan harga"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Deskripsi</label>
          <textarea
            placeholder="Masukan Deskripsi"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          ></textarea>
        </div>
        <div className="mb-4 max-w-[340px]">
          <label className="block font-bold mb-2">Gambar Utama</label>
          <div className="border-dashed border-2 border-gray-400 rounded-lg text-center">
            <input type="file" id="uploadFile1" className="hidden" />
            <label htmlFor="uploadFile1" className="cursor-pointer">
              <p className="p-3 flex justify-center gap-3 text-gray-300">
                Upload File di sini{" "}
                <span className="font-bold">Browse Files</span>
                <img src="../icon/upload-icon.svg" alt="" />
              </p>
            </label>
          </div>
        </div>
        <div className="mb-4 max-w-[340px]">
          <label className="block font-bold mb-2">Gambar Detail Kamar</label>
          <div className="border-dashed border-2 border-gray-400 rounded-lg text-center">
            <input type="file" id="uploadFile2" className="hidden" />
            <label htmlFor="uploadFile2" className="cursor-pointer">
              <p className="p-3 flex justify-center gap-3 text-gray-300">
                Upload File di sini{" "}
                <span className="font-bold">Browse Files</span>
                <img src="../icon/upload-icon.svg" alt="" />
              </p>
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary">Batal</Button>
          <Button type="submit" variant="primary">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminTypeKamarTambah;

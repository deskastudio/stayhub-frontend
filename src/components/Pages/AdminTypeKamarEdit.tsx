import React, { useState } from "react";
import Button from "../Elements/Button";
import { useParams } from "react-router-dom";

interface KamarDetail {
  name: string;
  fasilitas: string[];
  jumlah: number; 
  harga: string;
  deskripsi: string;
  gambarUtama: string;
  gambarDetail: string;
}

const AdminTypeKamarEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const kamarDetails: Record<string, KamarDetail> = {
    "1": {
      name: "Silver",
      fasilitas: ["Kasur", "Dapur", "WIFI"],
      jumlah: 1,
      harga: "500000",
      deskripsi: "Kamar Silver adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas. Terletak di area yang strategis, Kamar Silver memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka.",
      gambarUtama: "path/to/silver-main.jpg",
      gambarDetail: "path/to/silver-detail.jpg",
    },
    "2": {
      name: "Gold",
      fasilitas: ["Kasur", "Dapur", "WIFI", "AC"],
      jumlah: 1,
      harga: "1000000",
      deskripsi: "Kamar Gold adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas. Terletak di area yang strategis, Kamar Gold memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka.",
      gambarUtama: "path/to/gold-main.jpg",
      gambarDetail: "path/to/gold-detail.jpg",
    },
    "3": {
      name: "Platinum",
      fasilitas: ["Kasur", "Dapur", "WIFI", "AC"],
      jumlah: 1,
      harga: "1500000",
      deskripsi: "Kamar Platinum adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam, AC, dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas. Terletak di area yang strategis, Kamar Platinum  memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka.",
      gambarUtama: "path/to/platinum-main.jpg",
      gambarDetail: "path/to/platinum-detail.jpg",
    },
  };

  const detailKamar = id && kamarDetails[id] ? kamarDetails[id] : null;

  const [name, setName] = useState<string>(detailKamar?.name || "");
  const [fasilitas, setFasilitas] = useState<string[]>(detailKamar?.fasilitas || []);
  const [jumlah, setJumlah] = useState<number>(detailKamar?.jumlah || 1);
  const [harga, setHarga] = useState<string>(detailKamar?.harga || "");
  const [deskripsi, setDeskripsi] = useState<string>(detailKamar?.deskripsi || "");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, fasilitas, jumlah, harga, deskripsi });
  };

  if (!detailKamar) {
    return <div>Kamar tidak ditemukan</div>; 
  }

  return (
    <div className="min-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2">Type Kamar</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          ></textarea>
        </div>
        <div className="mb-4 max-w-[340px]">
          <label className="block font-bold mb-2">Gambar Utama</label>
          <div className="border-dashed border-2 border-gray-400 rounded-lg text-center">
            <img
              src={detailKamar.gambarUtama}
              alt="Gambar Utama"
              className="w-full h-auto"
            />
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
            <img
              src={detailKamar.gambarDetail}
              alt="Gambar Detail Kamar"
              className="w-full h-auto"
            />
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

export default AdminTypeKamarEdit;

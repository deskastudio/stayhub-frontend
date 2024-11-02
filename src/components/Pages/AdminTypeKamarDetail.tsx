import React from "react";
import { useParams } from "react-router-dom";
import Button from "../Elements/Button";

interface KamarDetail {
  name: string;
  fasilitas: string[];
  harga: string;
  deskripsi: string;
}

const kamarDetails: Record<string, KamarDetail> = {
  "1": {
    name: "Silver",
    fasilitas: ["Kasur", "Dapur", "WIFI"],
    harga: "Rp. 500.000",
    deskripsi: "Kamar Silver adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas. Terletak di area yang strategis, Kamar Silver memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka.",
  },
  "2": {
    name: "Gold",
    fasilitas: ["Kasur", "Dapur", "WIFI", "AC"],
    harga: "Rp. 1.000.000",
    deskripsi: "Kamar Gold adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas. Terletak di area yang strategis, Kamar Gold memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka.",
  },
  "3": {
    name: "Platinum",
    fasilitas: ["Kasur", "Dapur", "WIFI", "AC"],
    harga: "Rp. 1.500.000",
    deskripsi: "Kamar Platinum adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam, AC, dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas. Terletak di area yang strategis, Kamar Platinum  memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka.",
  },
};

const AdminTypeKamarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const detailKamar = id ? kamarDetails[id] : undefined;

  if (!detailKamar) {
    return <p>Data tidak ditemukan untuk ID ini.</p>;
  }

  return (
    <div className="min-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <form>
        <div className="mb-4">
          <label className="block font-bold mb-2">Type Kamar</label>
          <input
            type="text"
            value={detailKamar.name}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Fasilitas</label>
          <div className="flex space-x-2">
            {detailKamar.fasilitas.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-primary-dark text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Harga</label>
          <input
            type="text"
            value={detailKamar.harga}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Deskripsi</label>
          <textarea
            value={detailKamar.deskripsi}
            readOnly
            className="w-full min-h-[200px] px-3 py-2 border rounded-lg bg-gray-100 overflow-auto resize-none"
          ></textarea>
        </div>
         <div className="mb-4 max-w-[340px]">
          <label className="block font-bold mb-2">Gambar Utama</label>
          <div className="border-dashed border-2 border-gray-400 rounded-lg text-center">
            <input type="file" id="uploadFile1" className="hidden" />
              <p className="p-3 flex justify-center gap-3 text-gray-300">
                Lihat File 
              </p>
          </div>
        </div>

        <div className="mb-4 max-w-[340px]">
          <label className="block font-bold mb-2">Gambar Detail Kamar</label>
          <div className="border-dashed border-2 border-gray-400 rounded-lg text-center">
            <input type="file" id="uploadFile2" className="hidden" />
              <p className="p-3 flex justify-center gap-3 text-gray-300">
                Lihat File 
              </p>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="primary">
          Kembali
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminTypeKamarDetail;

import React, { useState } from "react";
import Button from "../Elements/Button";
import { Ajuan } from "./AjuanTable";

interface AjuanBalasModalProps {
  data: Ajuan;
  onClose: () => void;
  onSubmit: (tanggapan: string) => void;
}

const AjuanBalasModal: React.FC<AjuanBalasModalProps> = ({ data, onClose, onSubmit }) => {
  const [tanggapan, setTanggapan] = useState("");

  // Fungsi untuk menghandle perubahan input tanggapan
  const handleTanggapanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTanggapan(e.target.value);
  };

  // Fungsi untuk memeriksa dan memformat tanggal
  // const formatTanggal = (tanggal: string) => {
  //   const dateObj = new Date(tanggal);
  //   if (isNaN(dateObj.getTime())) {
  //     return ""; // Jika tidak valid, kembalikan string kosong
  //   }
  //   return format(dateObj, "dd/MM/yyyy"); // Memformat tanggal
  // };

  // Fungsi untuk menangani pengiriman tanggapan
  const handleSubmit = () => {
    if (tanggapan.trim()) {
      onSubmit(tanggapan); // Mengirimkan tanggapan
      onClose(); // Menutup modal setelah pengiriman
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl mr-2" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold  mt-4">Balas Ajuan</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
              <input type="text" value={data.user?.fullName} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div> */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">No Kamar</label>
              <input type="text" value={data.room?.name} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div> */}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Isi Ajuan</label>
            <textarea value={data.description} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows={4} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Tanggapan</label>
            <textarea value={tanggapan} onChange={handleTanggapanChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows={4} />
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="detail" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Kirim Balasan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanBalasModal;

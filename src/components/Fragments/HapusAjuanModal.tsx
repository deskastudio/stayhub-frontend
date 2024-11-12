import React from "react";
import Button from "../Elements/Button";
import { DataItem } from "./AjuanTable";

interface AjuanHapusModalProps {
  data: DataItem;
  onClose: () => void;
  onDelete: (noKamar: string) => void; // Fungsi untuk menghapus ajuan berdasarkan noKamar
}

const AjuanHapusModal: React.FC<AjuanHapusModalProps> = ({ data, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(data.noKamar); // Menghapus ajuan berdasarkan noKamar
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl" onClick={onClose}>
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Hapus Ajuan</h2>
        <p className="mb-4 text-gray-700 font-medium">Yakin ingin menghapus ajuan ini?</p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Pengajuan dari</label>
            <input type="text" value={data.nama} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="detail" onClick={onClose}>
              Batal
            </Button>
            <Button variant="deleted" onClick={handleDelete}>
              Hapus
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanHapusModal;

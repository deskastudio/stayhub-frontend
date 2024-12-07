import React, { useState, useEffect } from "react";
import Button from "../../components/Elements/Button";

// Menentukan tipe Ajuan
interface Ajuan {
  id: number;
  perihal: string;
  status: "Selesai" | "Menunggu";
  tanggal: string;
  isiAjuan: string;
}

interface EditAjuanModalProps {
  isOpen: boolean;
  ajuanData: Ajuan; // Data ajuan yang akan diedit
  onClose: () => void;
  onSave: (updatedAjuan: Ajuan) => void; // Fungsi untuk menyimpan perubahan
}

const EditAjuanModal: React.FC<EditAjuanModalProps> = ({ isOpen, ajuanData, onClose, onSave }) => {
  const [formData, setFormData] = useState<Ajuan>(ajuanData); // State untuk menyimpan data form

  useEffect(() => {
    setFormData(ajuanData); // Set ulang data saat modal dibuka
  }, [ajuanData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof Ajuan // Membatasi field yang dapat diubah
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData); // Kirim data yang sudah diubah ke parent
    onClose(); // Tutup modal setelah menyimpan
  };

  if (!isOpen) return null; // Tidak menampilkan modal jika tidak dibuka

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3 className="text-xl font-semibold mb-4">Edit Ajuan</h3>
        <form>
          {/* Dropdown Perihal */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Perihal</label>
            <select className="mt-1 p-2 border w-full" value={formData?.perihal} onChange={(e) => handleInputChange(e, "perihal")}>
              <option value="Fasilitas">Fasiitas</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Input Tanggal */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input type="date" className="mt-1 p-2 border w-full" value={formData?.tanggal} onChange={(e) => handleInputChange(e, "tanggal")} />
          </div>

          {/* Textarea Isi Ajuan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Isi Ajuan</label>
            <textarea className="mt-1 p-2 border w-full" value={formData?.isiAjuan} onChange={(e) => handleInputChange(e, "isiAjuan")} />
          </div>

          {/* Status Ajuan */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className={`mt-1 p-2 rounded border ${formData?.status === "Selesai" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{formData?.status}</p>
          </div>

          {/* Tombol Simpan dan Batal */}
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAjuanModal;

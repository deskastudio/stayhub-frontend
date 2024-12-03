import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ajuan } from "../../Pages/UserListAjuan"; // Pastikan path ini benar

interface AjuanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Ajuan, "id">) => void; // Menambahkan prop onSubmit
}

const AjuanModal: React.FC<AjuanModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    noKamar: "",
    tanggal: "",
    perihal: "Fasilitas",
    isiAjuan: "",
  });

  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit form
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Ambil data dari form
    const { namaLengkap, email, noKamar, tanggal, perihal, isiAjuan } = formData;

    // Menambahkan status dan aksi dengan nilai default
    const dataToSubmit: Omit<Ajuan, "id"> = {
      namaLengkap,
      email,
      noKamar,
      tanggal,
      perihal,
      isiAjuan,
      status: "Menunggu",
    };

    // Kirim data ke parent melalui onSubmit
    onSubmit(dataToSubmit); // Mengirimkan data ke parent component

    // Setelah form disubmit, arahkan pengguna ke halaman UserListAjuan
    navigate("/user-list-ajuan"); // Ganti dengan path yang sesuai
  };

  if (!isOpen) return null; // Menyembunyikan modal jika isOpen false

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Pengajuan Keluhan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Lengkap</label>
            <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Masukkan nama lengkap" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Masukkan email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">No Kamar</label>
            <input type="text" name="noKamar" value={formData.noKamar} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Masukkan no kamar" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tanggal</label>
            <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Perihal</label>
            <select name="perihal" value={formData.perihal} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Fasilitas">Fasilitas</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Isi Ajuan</label>
            <textarea name="isiAjuan" value={formData.isiAjuan} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Masukkan keluhanmu"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjuanModal;

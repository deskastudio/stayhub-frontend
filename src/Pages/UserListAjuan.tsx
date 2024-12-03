import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Elements/Button";
import UserProfil from "../components/Fragments/ProfileUser";
import Placeholder from "../components/Fragments/Placeholder";
import EditAjuanModal from "../components/Fragments/EditAjuanModal"; // Import modal edit

// Menyesuaikan tipe data Ajuan
export interface Ajuan {
  id: number;
  perihal: string;
  status: "Selesai" | "Menunggu";
  tanggal: string;
  isiAjuan: string;
}

const UserListAjuan: React.FC = () => {
  const pageTitle = "List Ajuan";
  const [ajuanList, setAjuanList] = useState<Ajuan[]>([]); // Daftar keluhan
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk membuka/tutup modal
  const [selectedAjuan, setSelectedAjuan] = useState<Ajuan | null>(null); // Ajuan yang dipilih untuk diedit
  const navigate = useNavigate(); // Hook untuk navigasi

  // Memuat data keluhan dari localStorage saat halaman di-load
  useEffect(() => {
    const savedAjuanList = JSON.parse(localStorage.getItem("ajuanList") || "[]");
    setAjuanList(savedAjuanList); // Menyimpan data ke state
  }, []);

  const handleAddAjuan = () => {
    // Navigasi ke halaman user-ajuan untuk menambahkan ajuan
    navigate("/user-ajuan");
  };

  const handleEdit = (id: number) => {
    // Cari ajuan yang akan diedit berdasarkan id
    const ajuanToEdit = ajuanList.find((ajuan) => ajuan.id === id);
    if (ajuanToEdit) {
      setSelectedAjuan(ajuanToEdit);
      setIsModalOpen(true); // Buka modal edit
    }
  };

  const handleDelete = (id: number) => {
    // Menampilkan alert konfirmasi sebelum menghapus
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus ajuan ini?");
    if (confirmDelete) {
      // Menghapus ajuan berdasarkan id
      const updatedAjuanList = ajuanList.filter((ajuan) => ajuan.id !== id);
      setAjuanList(updatedAjuanList);
      localStorage.setItem("ajuanList", JSON.stringify(updatedAjuanList)); // Simpan ke localStorage
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Menutup modal edit
    setSelectedAjuan(null); // Reset data ajuan yang sedang diedit
  };

  const handleSaveAjuan = (updatedAjuan: Ajuan) => {
    // Update data ajuan di localStorage
    const updatedAjuanList = ajuanList.map((ajuan) => (ajuan.id === updatedAjuan.id ? updatedAjuan : ajuan));
    setAjuanList(updatedAjuanList);
    localStorage.setItem("ajuanList", JSON.stringify(updatedAjuanList)); // Simpan ke localStorage
  };

  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <UserProfil />
      </div>

      <div>
        {ajuanList.length === 0 ? (
          <Placeholder title="Belum ada ajuan" description="Silakan tambahkan ajuan baru." buttonText="Tambah Ajuan" onAdd={handleAddAjuan} />
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-primary-dark text-white">
                <th className="px-4 py-2 ">ID Ajuan</th>
                <th className="px-4 py-2 ">Tanggal</th>
                <th className="px-4 py-2 ">Perihal</th>
                <th className="px-4 py-2 ">Isi Ajuan</th>
                <th className="px-4 py-2 ">Status</th>
                <th className="px-4 py-2 ">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ajuanList.map((ajuan) => (
                <tr key={ajuan.id} className="text-center">
                  <td className="px-4 py-2 border">{ajuan.id}</td>
                  <td className="px-4 py-2 border">{ajuan.tanggal}</td>
                  <td className="px-4 py-2 border">{ajuan.perihal}</td>
                  <td className="px-4 py-2 border">{ajuan.isiAjuan}</td>
                  <td className="p-4 text-center w-32">
                    <span className={`px-2 py-1 rounded text-center w-full inline-block ${ajuan.status === "Selesai" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{ajuan.status}</span>
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <Button variant="primary" onClick={() => handleEdit(ajuan.id)}>
                      Edit
                    </Button>
                    <Button variant="deleted" onClick={() => handleDelete(ajuan.id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal untuk Edit Ajuan */}
      {selectedAjuan && <EditAjuanModal isOpen={isModalOpen} ajuanData={selectedAjuan} onClose={handleModalClose} onSave={handleSaveAjuan} />}
    </div>
  );
};

export default UserListAjuan;

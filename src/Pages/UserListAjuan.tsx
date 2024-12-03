import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserProfil from "../components/Fragments/ProfileUser";
import Placeholder from "../components/Fragments/Placeholder";

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
    // Navigasi ke halaman edit ajuan (misalnya /edit-ajuan/:id)
    navigate(`/edit-ajuan/${id}`);
  };

  const handleDelete = (id: number) => {
    // Menghapus ajuan berdasarkan id
    const updatedAjuanList = ajuanList.filter((ajuan) => ajuan.id !== id);
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
          <Placeholder
            title="Belum ada ajuan"
            description="Silakan tambahkan ajuan baru."
            buttonText="Tambah Ajuan"
            onAdd={handleAddAjuan} // Panggil handleAddAjuan saat klik tombol
          />
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
                  <td className={`px-4 py-2 border ${ajuan.status === "Selesai" ? "text-green-600" : "text-red-600"}`}>{ajuan.status}</td>
                  <td className="px-4 py-2 border">
                    <button onClick={() => handleEdit(ajuan.id)} className="text-blue-600 hover:text-blue-800 mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(ajuan.id)} className="text-red-600 hover:text-red-800">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListAjuan;

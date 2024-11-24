import React, { useState } from "react";
import UserProfil from "../components/Fragments/ProfileUser";
import Placeholder from "../components/Fragments/Placeholder";
import PopupFormAjuan from "../components/Fragments/PopupFormAjuan";

interface Ajuan {
  id: number;
  perihal: string;
  status: string;
  tanggal: string;
  aksi: string;
}

const UserListAjuan: React.FC = () => {
  const pageTitle = "List Ajuan";

  const [ajuanList, setAjuanList] = useState<Ajuan[]>([]); // State untuk menyimpan list ajuan
  const [isPopupOpen, setPopupOpen] = useState(false); // State untuk mengontrol pop-up

  const handleAddAjuan = () => {
    setPopupOpen(true); // Buka pop-up ketika tombol ditekan
  };

  const handleClosePopup = () => {
    setPopupOpen(false); // Tutup pop-up
  };

  const handleFormSubmit = (formData: Omit<Ajuan, "id">) => {
    // Tambahkan data baru ke dalam list ajuan dengan menambahkan `id` secara manual
    const newAjuan: Ajuan = {
      ...formData,
      id: ajuanList.length + 1, // Generate id berdasarkan panjang array
    };
    setAjuanList((prev) => [...prev, newAjuan]);
    handleClosePopup(); // Tutup pop-up setelah data ditambahkan
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
            onAdd={handleAddAjuan}
          />
        ) : (
          <div>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-primary-dark text-white">
                  <th className="px-4 py-2 border">Perihal</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {ajuanList.map((ajuan) => (
                  <tr key={ajuan.id} className="text-center">
                    <td className="px-4 py-2 border">{ajuan.perihal}</td>
                    <td
                      className={`px-4 py-2 border ${
                        ajuan.status === "Selesai"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ajuan.status}
                    </td>
                    <td className="px-4 py-2 border">{ajuan.tanggal}</td>
                    <td className="px-4 py-2 border">{ajuan.aksi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pop-up untuk formulir */}
      {isPopupOpen && (
        <PopupFormAjuan onClose={handleClosePopup} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default UserListAjuan;

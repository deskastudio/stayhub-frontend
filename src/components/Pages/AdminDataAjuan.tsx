import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import ProfileInfo from "../Elements/ProfileInfo";
import FilterButton from "../Elements/FilterButton";
import PrintButton from "../Elements/PrintButton";
import Pagination from "../Elements/Pagination";
import DataTable, { AjuanItem } from "../Elements/AjuanTable"; 
import AjuanResponseModal from "../Elements/AjuanResponseModal"; 

const AdminDataAjuan: React.FC = () => {
  const totalItems = 50; // Total item, bisa diambil dari state atau props
  const itemsPerPage = 15; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // State untuk halaman aktif
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol apakah modal terbuka
  const [selectedAjuan, setSelectedAjuan] = useState<AjuanItem | null>(null); // Use AjuanItem instead of Ajuan

  // Contoh data
  const data: AjuanItem[] = [
    { id: 1, nama: "Kevin Joe", noKamar: "301", perihal: "Fasilitas", tanggal: "22/10/24", status: "Menunggu" },
    { id: 2, nama: "Alif S", noKamar: "305", perihal: "Fasilitas", tanggal: "22/10/24", status: "Selesai" },
    { id: 3, nama: "Angel", noKamar: "203", perihal: "Keamanan", tanggal: "22/10/24", status: "Menunggu" },
    { id: 4, nama: "Ayu L", noKamar: "109", perihal: "Lainnya", tanggal: "22/10/24", status: "Selesai" },
    { id: 5, nama: "M.Yoga", noKamar: "205", perihal: "Fasilitas", tanggal: "22/10/24", status: "Menunggu" },
    { id: 6, nama: "Yosi", noKamar: "201", perihal: "Kegaduhan", tanggal: "22/10/24", status: "Selesai" },
    
  ];

  // Fungsi untuk membuka modal balasan dengan data ajuan yang dipilih
  const handleOpenModal = (ajuan: AjuanItem) => {
    setSelectedAjuan(ajuan);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal balasan
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAjuan(null);
  };

  return (
    <MainLayout>
      <div className="p-8 flex-grow">
        {/* Menggunakan flex untuk menyelaraskan judul dan profil */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Data Ajuan</h1>
          <ProfileInfo />
        </div>

        {/* Container untuk Filter Buttons dan Cetak PDF */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <FilterButton />
            <FilterButton />
          </div>
          <PrintButton />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <DataTable data={data} onReplyClick={handleOpenModal} /> {/* Corrected to DataTable */}
        </div>

        {/* Container untuk jumlah dan pagination */}
        <div className="flex items-center mt-4 ">
          {/* Tulisan Jumlah */}
          <p className="text-sm">
            Jumlah {1 + (activePage - 1) * itemsPerPage}-{Math.min(activePage * itemsPerPage, totalItems)} dari {totalItems}
          </p>
          {/* Menggunakan flex-grow untuk mengisi ruang antara tulisan dan pagination */}
          <div className="flex-grow"></div>
          {/* Komponen Pagination dengan props aktif */}
          <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} activePage={activePage} setActivePage={setActivePage} />
        </div>
      </div>

      {/* Render modal balasan jika ada ajuan yang dipilih */}
      {selectedAjuan && <AjuanResponseModal isOpen={isModalOpen} onClose={handleCloseModal} nama={selectedAjuan.nama} noKamar={selectedAjuan.noKamar} isiAjuan={selectedAjuan.perihal} />}
    </MainLayout>
  );
};

export default AdminDataAjuan;

import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import ProfileInfo from "../Elements/ProfileInfo";
import FilterButton from "../Elements/FilterButton";
import PrintButton from "../Elements/PrintButton";
import Pagination from "../Elements/Pagination";
import CardPayment from "../Elements/CardPayment";
import PaymentTable from "../Elements/PaymentTable";

const AdminDataPembayaran: React.FC = () => {
  const totalItems = 50; // Total item, bisa diambil dari state atau props
  const itemsPerPage = 15; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // State untuk halaman aktif

  // Contoh data pembayaran
  const data = [
    { idBayar: "000001", typeKamar: "Gold", noKamar: "101", jatuhTempo: "20/11/24", status: "Belum bayar", total: "Rp. 500.000" },
    { idBayar: "000002", typeKamar: "Gold", noKamar: "102", jatuhTempo: "20/11/24", status: "Lunas", total: "Rp. 500.000" },
    { idBayar: "000003", typeKamar: "Gold", noKamar: "103", jatuhTempo: "20/11/24", status: "Belum bayar", total: "Rp. 500.000" },
    { idBayar: "000004", typeKamar: "Gold", noKamar: "104", jatuhTempo: "20/11/24", status: "Lunas", total: "Rp. 500.000" },
  ];

  return (
    <MainLayout>
      <div className="p-8 flex-grow">
        {/* Menggunakan flex untuk menyelaraskan judul dan profil */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Data Pembayaran</h1>
          <ProfileInfo />
        </div>

        {/* Card Payment */}
        <div className="mb-6">
          <CardPayment
            pendapatanBulanan="Pendapatan Bulanan"
            bulan="Januari"
            totalPendapatan="Rp. 20.000.000"
            penghuniBelumBayar={10}
            pembayaranBerhasil={10}
          />
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
        <div className="overflow-x-auto mb-4">
          <PaymentTable data={data} />
        </div>

        {/* Container untuk jumlah dan pagination */}
        <div className="flex items-center mt-4">
          {/* Tulisan Jumlah */}
          <p className="text-sm">
            Jumlah {1 + (activePage - 1) * itemsPerPage}-{Math.min(activePage * itemsPerPage, totalItems)} dari {totalItems}
          </p>
          {/* Menggunakan flex-grow untuk mengisi ruang antara tulisan dan pagination */}
          <div className="flex-grow"></div>
          {/* Komponen Pagination dengan props aktif */}
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDataPembayaran;

import React, { useState } from "react";
import ProfileInfo from "../components/Elements/ProfileInfo";
import FilterButton from "../components/Elements/FilterButton";
import PrintButton from "../components/Elements/PrintButton";
import Pagination from "../components/Elements/Pagination";
import CardPayment from "../components/Elements/CardPayment";
import PaymentTable from "../components/Elements/PaymentTable";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Data Pembayaran</h1>
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
  );
};

export default AdminDataPembayaran;

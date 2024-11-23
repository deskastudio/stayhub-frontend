import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterButton from "../components/Elements/FilterButton";
import PrintButton from "../components/Elements/PrintButton";
import Pagination from "../components/Elements/Pagination";
import AjuanTable from "../components/Fragments/AjuanTable";
import data from "../json/dataAjuan.json";
import { DataItem } from "../components/Fragments/AjuanTable";
import ProfileInfo from "../components/Elements/ProfileInfo";

const AdminDataAjuan = () => {
  const [ajuanData, setAjuanData] = useState<DataItem[]>([]);
  const location = useLocation();
  const totalItems = data.length; // Total data yang ada (dari json)
  const itemsPerPage = 5; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // State untuk halaman aktif
  const pageTitle = "Data Ajuan";

  // Menangani data ajuan dari JSON file
  useEffect(() => {
    setAjuanData(data);
  }, []);

  // Menghitung data yang ditampilkan pada halaman aktif
  const indexOfLastItem = activePage * itemsPerPage; // index item terakhir
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // index item pertama
  const currentItems = ajuanData.slice(indexOfFirstItem, indexOfLastItem); // Data untuk halaman saat ini

  console.log("Current Path:", location.pathname);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
          <ProfileInfo />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <FilterButton />
            <FilterButton />
          </div>
          <PrintButton />
        </div>

        {/* Mengirimkan data halaman aktif ke AjuanTable */}
        <AjuanTable ajuanData={currentItems} />

        <div className="flex items-center mt-4">
          {/* Tulisan Jumlah */}
          <p className="text-sm">
            Jumlah {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} dari {totalItems}
          </p>
          {/* Menggunakan flex-grow untuk mengisi ruang antara tulisan dan pagination */}
          <div className="flex-grow"></div>
          {/* Komponen Pagination dengan props aktif */}
          <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} activePage={activePage} setActivePage={setActivePage} />
        </div>
      </div>
  );
};

export default AdminDataAjuan;

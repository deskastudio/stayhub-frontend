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
  const [filteredData, setFilteredData] = useState<DataItem[]>([]); // Data yang sudah difilter
  const location = useLocation();
  const totalItems = filteredData.length; // Total data yang sudah difilter
  const itemsPerPage = 5; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // Halaman aktif
  const [filterStatus, setFilterStatus] = useState<string>("Semua"); // Filter status
  const pageTitle = "Data Ajuan";

  // Menangani data ajuan dari JSON file
  useEffect(() => {
    setAjuanData(data);
    setFilteredData(data); // Set data awal ke filteredData
  }, []);

  // Fungsi untuk menerapkan filter status
  useEffect(() => {
    let tempData = [...ajuanData];

    // Filter berdasarkan status
    if (filterStatus !== "Semua") {
      tempData = tempData.filter((item) => item.status.toLowerCase() === filterStatus.toLowerCase());
    }

    setFilteredData(tempData);
  }, [ajuanData, filterStatus]);

  // Menghitung data yang ditampilkan pada halaman aktif
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  console.log("Current Path:", location.pathname);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        <ProfileInfo />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* Filter Status */}
          <FilterButton options={["Semua", "Selesai", "Menunggu"]} onFilter={(option) => setFilterStatus(option)} />
        </div>
        <PrintButton />
      </div>

      {/* Mengirimkan data halaman aktif ke AjuanTable */}
      <AjuanTable ajuanData={currentItems} />

      <div className="flex items-center mt-4">
        <p className="text-sm">
          Jumlah {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} dari {totalItems}
        </p>
        <div className="flex-grow"></div>
        {/* Komponen Pagination dengan props aktif */}
        <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default AdminDataAjuan;

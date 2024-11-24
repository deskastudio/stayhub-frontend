import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileUser from "../components/Fragments/ProfileUser";
import FilterButton from "../components/Elements/FilterButton";
import PaymentTable from "../components/Fragments/PaymentTable";
import data from "../json/payment.json";
import Pagination from "../components/Elements/Pagination";
import Search from "../components/Elements/Search"; 


export interface PaymentItem {
  id: string;
  date: string;
  status: string;
}

const UserPembayaran = () => {
  const [paymentData, setPaymentData] = useState<PaymentItem[]>([]); // Menggunakan PaymentItem[] sebagai tipe data
  const location = useLocation();
  const totalItems = paymentData.length; // Total data yang ada (dari state)
  const itemsPerPage = 5; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // State untuk halaman aktif
  const [searchQuery, setSearchQuery] = useState<string>(""); // State untuk menyimpan query pencarian

  // Menghitung data yang ditampilkan pada halaman aktif
  const indexOfLastItem = activePage * itemsPerPage; // index item terakhir
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // index item pertama
  const currentItems = paymentData
    .filter(
      (item) => item.id.toLowerCase().includes(searchQuery.toLowerCase()) || item.status.toLowerCase().includes(searchQuery.toLowerCase()) // Filter berdasarkan query
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageTitle = "Hello John";

  
  useEffect(() => {
    setPaymentData(data); 
  }, []);

  console.log("Current Path:", location.pathname);

  return (
    <div className="p-8 flex-grow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
          <p>Yuk cek tagihan kamarmu sekarang juga</p>
        </div>
        <ProfileUser />
      </div>
      {/* Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <FilterButton />
          <FilterButton />
        </div>
        <div>
          <Search onSearch={(query) => setSearchQuery(query)} />
        </div>
      </div>
  
      <PaymentTable data={currentItems} />
      <div className="flex items-center mt-4">
       
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

export default UserPembayaran;

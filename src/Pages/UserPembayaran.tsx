import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Profile from '../components/Fragments/Profile';
import FilterButton from '../components/Elements/FilterButton';
import PaymentTable from '../components/Fragments/PaymentTableUser';
import data from '../json/payment.json';
import Pagination from '../components/Elements/Pagination';
import Search from '../components/Elements/Search';

// Tipe untuk item pembayaran
export interface PaymentItem {
  id: string;
  date: string;
  status: string;
}

const UserPembayaran = () => {
  const [paymentData, setPaymentData] = useState<PaymentItem[]>([]); // Data asli
  const [filteredData, setFilteredData] = useState<PaymentItem[]>([]); // Data setelah filter
  const location = useLocation();
  const totalItems = filteredData.length; // Total data setelah filter
  const itemsPerPage = 5; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // Halaman aktif
  const [searchQuery, setSearchQuery] = useState<string>(''); // Query pencarian
  const [filterStatus, setFilterStatus] = useState<string>('Semua'); // Filter status
  const [filterMonth, setFilterMonth] = useState<string>('Semua'); // Filter bulan

  // Menghitung indeks data yang ditampilkan
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageTitle = 'Hello John';

  console.log('Current Path:', location.pathname);

  useEffect(() => {
    // Load data awal
    setPaymentData(data);
    setFilteredData(data);
  }, []);

  // Fungsi untuk menerapkan semua filter
  useEffect(() => {
    let tempData = [...paymentData];

    // Filter status
    if (filterStatus !== 'Semua') {
      tempData = tempData.filter(
        (item) => item.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Filter bulan
    if (filterMonth !== 'Semua') {
      tempData = tempData.filter((item) => {
        const itemMonth = new Date(item.date).toLocaleString('id-ID', {
          month: 'long',
        });
        return itemMonth.toLowerCase() === filterMonth.toLowerCase();
      });
    }

    // Filter search query
    if (searchQuery) {
      tempData = tempData.filter(
        (item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(tempData);
  }, [paymentData, filterStatus, filterMonth, searchQuery]);

  return (
    <div className='p-8 flex-grow'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <div className='flex-col'>
          <h1 className='text-2xl font-bold text-gray-800'>{pageTitle}</h1>
          <p>Yuk cek tagihan kamarmu sekarang juga</p>
        </div>
        <Profile />
      </div>
      {/* Filter Section */}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex space-x-4'>
          {/* Filter Status */}
          <FilterButton
            options={['Semua', 'Lunas', 'Belum bayar']}
            onFilter={(option) => setFilterStatus(option)}
          />
          {/* Filter Bulan */}
          <FilterButton
            options={[
              'Semua',
              'Januari',
              'Februari',
              'Maret',
              'April',
              'Mei',
              'Juni',
              'Juli',
              'Agustus',
              'September',
              'Oktober',
              'November',
              'Desember',
            ]}
            onFilter={(option) => setFilterMonth(option)}
          />
        </div>
        <div>
          <Search onSearch={(query) => setSearchQuery(query)} />
        </div>
      </div>

      {/* Payment Table */}
      <PaymentTable data={currentItems} />
      <div className='flex items-center mt-4'>
        <p className='text-sm'>
          Jumlah {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}{' '}
          dari {totalItems}
        </p>
        <div className='flex-grow'></div>
        {/* Pagination */}
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

export default UserPembayaran;

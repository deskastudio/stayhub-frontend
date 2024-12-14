import { useState, useEffect } from 'react';
import SectionHeader from '../components/Elements/SectionHeader';
import Profile from '../components/Fragments/Profile';
import FilterButton from '../components/Elements/FilterButton';
import PrintButton from '../components/Elements/PrintButton';
import Pagination from '../components/Elements/Pagination';
import CardPayment from '../components/Elements/CardPayment';
import PaymentTable, { PaymentItem } from '../components/Elements/PaymentTable';

const AdminDataPembayaran: React.FC = () => {
  const itemsPerPage = 5; // Jumlah item per halaman
  const [activePage, setActivePage] = useState<number>(1); // State untuk halaman aktif
  const [filteredData, setFilteredData] = useState<PaymentItem[]>([]); // Data yang sudah difilter
  const [filterStatus, setFilterStatus] = useState<string>('Semua'); // Filter status (default: Semua)

  // Contoh data pembayaran
  const data = [
    {
      idBayar: '000001',
      typeKamar: 'Gold',
      noKamar: '101',
      jatuhTempo: '20/11/24',
      status: 'Belum bayar',
      total: 'Rp. 500.000',
    },
    {
      idBayar: '000002',
      typeKamar: 'Gold',
      noKamar: '102',
      jatuhTempo: '20/11/24',
      status: 'Lunas',
      total: 'Rp. 500.000',
    },
    {
      idBayar: '000003',
      typeKamar: 'Gold',
      noKamar: '103',
      jatuhTempo: '20/11/24',
      status: 'Belum bayar',
      total: 'Rp. 500.000',
    },
    {
      idBayar: '000004',
      typeKamar: 'Gold',
      noKamar: '104',
      jatuhTempo: '20/11/24',
      status: 'Lunas',
      total: 'Rp. 500.000',
    },
    {
      idBayar: '000005',
      typeKamar: 'Gold',
      noKamar: '105',
      jatuhTempo: '20/11/24',
      status: 'Belum bayar',
      total: 'Rp. 500.000',
    },
    {
      idBayar: '000006',
      typeKamar: 'Silver',
      noKamar: '106',
      jatuhTempo: '20/11/24',
      status: 'Lunas',
      total: 'Rp. 500.000',
    },
  ];

  // Menangani data filter
  useEffect(() => {
    let tempData = [...data]; // Membuat salinan data untuk di-filter

    // Filter berdasarkan status
    if (filterStatus !== 'Semua') {
      tempData = tempData.filter(
        (item) => item.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredData(tempData); // Menyimpan data yang sudah difilter ke state
  }, [filterStatus]); // Efek ini akan dijalankan ketika filterStatus berubah

  // Menghitung data yang ditampilkan pada halaman aktif
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Data untuk halaman saat ini

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <SectionHeader title='Data Pembayaran'>
        <Profile />
      </SectionHeader>

      {/* Card Payment */}
      <div className='mb-6'>
        <CardPayment
          pendapatanBulanan='Pendapatan Bulanan'
          bulan='Januari'
          totalPendapatan='Rp. 20.000.000'
          penghuniBelumBayar={10}
          pembayaranBerhasil={10}
        />
      </div>

      {/* Filter Status */}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex space-x-4'>
          {/* Filter button untuk status (Semua, Belum bayar, Lunas) */}
          <FilterButton
            options={['Semua', 'Belum bayar', 'Lunas']}
            onFilter={(option) => setFilterStatus(option)} // Menangani perubahan status filter
          />
        </div>
        <PrintButton />
      </div>

      {/* Data Table */}
      <div className='overflow-x-auto mb-4'>
        <PaymentTable data={currentItems} />{' '}
        {/* Menampilkan data yang sudah difilter */}
      </div>

      {/* Container untuk jumlah dan pagination */}
      <div className='flex items-center mt-4'>
        <p className='text-sm'>
          Jumlah {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredData.length)} dari{' '}
          {filteredData.length}
        </p>
        <div className='flex-grow'></div>
        <Pagination
          totalItems={filteredData.length} // Menggunakan jumlah data yang sudah difilter
          itemsPerPage={itemsPerPage}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </div>
  );
};

export default AdminDataPembayaran;

// src/components/Dashboard.tsx
import React from 'react';
import CardContainerBeranda from '../components/Fragments/CardContainerBeranda';
import ProfileAdmin from '../components/Fragments/ProfileAdmin';
import StatisticsCard from '../components/Fragments/StatisticsChart';
import DataTable from '../components/Elements/DataTableBeranda';

const Dashboard: React.FC = () => {
  const data = [1200000, 1800000, 2000000, 1500000, 1600000, 1900000];
  const labels = ['2017', '2018', '2019', '2020', '2021', '2022'];
 

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
        <ProfileAdmin />
      </div>

      {/* Card Section - Menggunakan grid untuk lebar penuh */}
      <div className='mb-8'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Semua Data</h2>
        <CardContainerBeranda />
      </div>

      {/* Chart Section - Menggunakan grid agar responsif dan lebar penuh */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <StatisticsCard
          title='Pendapatan Per Tahun'
          subtitle='Annual'
          data={data}
          labels={labels}
          filterOptions={['Annual', 'Monthly']}
        />
        <StatisticsCard
          title='Penghuni'
          subtitle='Years'
          data={data}
          labels={labels}
          filterOptions={['Years', 'Months']}
        />
      </div>

      {/* Table Section */}
      <DataTable />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import CardContainerBeranda from '../components/Fragments/CardContainerBeranda';
import Profile from '../components/Fragments/Profile';
import DataTable from '../components/Elements/DataTableBeranda';

const Dashboard: React.FC = () => {
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
        <Profile />
      </div>
      <div className='mb-8'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Semua Data</h2>
        <CardContainerBeranda />
      </div>
      <DataTable />
    </div>
  );
};

export default Dashboard;

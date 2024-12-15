import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const TypeKamarTable: React.FC = () => {
  const typeKamarData = [
    { id: 1, name: 'Silver', price: 'Rp. 500.000' },
    { id: 2, name: 'Gold', price: 'Rp. 1.000.000' },
    { id: 3, name: 'Platinum', price: 'Rp. 1.500.000' },
  ];

  return (
    <div>
      <div className='flex justify-end mb-10 mt-10'>
        <Link to='tambah'>
          <Button variant='primary'>
            <div className='flex gap-2 px-4 py-1'>
              <img src='icon/add-icon.svg' alt='' />
              <p className='font-medium'>Tambah Type</p>
            </div>
          </Button>
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg border-collapse'>
          <thead className='bg-primary-dark text-white'>
            <tr>
              <th className='p-4 text-center'>Type Kamar</th>
              <th className='p-4 text-center'>Harga</th>
              <th className='p-4 text-center'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {typeKamarData.map((typeKamar) => (
              <tr key={typeKamar.id} className='text-center border-b'>
                <td className='p-4'>{typeKamar.name}</td>
                <td className='p-4'>{typeKamar.price}</td>
                <td className='p-4 flex justify-center space-x-2'>
                  <Link to={`/type-kamar/detail/${typeKamar.id}`}>
                    <img
                      src='/icon/detail-icon.svg'
                      alt='Detail'
                      className='w-5 h-5 cursor-pointer'
                    />
                  </Link>
                  <Link to={`/type-kamar/edit/${typeKamar.id}`}>
                    <img
                      src='/icon/edit-icon.svg'
                      alt='Edit'
                      className='w-5 h-5 cursor-pointer'
                    />
                  </Link>
                  <img
                    src='/icon/trash-icon.svg'
                    alt='Delete'
                    className='w-5 h-5 cursor-pointer'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypeKamarTable;

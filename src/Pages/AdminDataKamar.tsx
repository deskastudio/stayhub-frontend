import React, { useState } from 'react';
import kamarData from '../json/dataKamar.json';
import Button from '../components/Elements/Button'; // Sesuaikan path dengan struktur Anda
import FilterButton from '../components/Elements/FilterButton'; // Sesuaikan path dengan struktur Anda

// Definisi tipe data Kamar langsung di file ini, jika tidak ingin membuat file terpisah
type Kamar = {
  id: number;
  noKamar: number;
  status: 'Penuh' | 'Kosong';
};

const DataKamar: React.FC = () => {
  const [data] = useState<Kamar[]>(kamarData as Kamar[]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Kamar</h2>

        <div className="flex gap-4">
          <FilterButton />
          <Button onClick={() => console.log('Tambah kamar')} variant="primary">
            + Tambah Kamar
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-2">ID</th>
              <th className="border-b-2 p-2">No Kamar</th>
              <th className="border-b-2 p-2">Status</th>
              <th className="border-b-2 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((kamar) => (
              <tr key={kamar.id} className="text-center">
                <td className="p-2 border-b">{kamar.id}</td>
                <td className="p-2 border-b">{kamar.noKamar}</td>
                <td className="p-2 border-b">
                  <span className={`px-2 py-1 rounded-full text-white ${
                    kamar.status === 'Penuh' ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    {kamar.status}
                  </span>
                </td>
                <td className="p-2 border-b flex justify-center gap-2">
                  <button onClick={() => console.log('Lihat detail kamar', kamar.id)} className="text-blue-500 hover:text-blue-700">
                    👁️
                  </button>
                  <button onClick={() => console.log('Edit kamar', kamar.id)} className="text-yellow-500 hover:text-yellow-700">
                    ✏️
                  </button>
                  <button onClick={() => console.log('Hapus kamar', kamar.id)} className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <p className="text-sm text-gray-600">Jumlah 15 dari 50</p>
        <div className="flex items-center gap-2 ml-4">
          <button className="px-2 py-1 border rounded">1</button>
          <button className="px-2 py-1 border rounded">2</button>
          <button className="px-2 py-1 border rounded">3</button>
          <button className="px-2 py-1 border rounded">4</button>
        </div>
      </div>
    </div>
  );
};

export default DataKamar;

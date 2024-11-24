// src/components/elements/DataTable.tsx
import React from 'react';

const DataTable: React.FC = () => {
    const data = [
        { id: 1, tanggal: '21 Okt 2024', penghuni: 'Adzana Ashel', harga: 'Rp. 500.000', status: 'Lunas' },
        { id: 2, tanggal: '21 Okt 2024', penghuni: 'Zee', harga: 'Rp. 500.000', status: 'Terlambat' },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 text-sm border-b">
                        <th className="py-2">Id</th>
                        <th className="py-2">Tanggal</th>
                        <th className="py-2">Penghuni</th>
                        <th className="py-2">Harga</th>
                        <th className="py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="text-gray-700">
                            <td className="py-2">{item.id}</td>
                            <td className="py-2">{item.tanggal}</td>
                            <td className="py-2">{item.penghuni}</td>
                            <td className="py-2">{item.harga}</td>
                            <td className="py-2">
                                <span
                                    className={`px-2 py-1 rounded-full text-sm ${
                                        item.status === 'Lunas'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

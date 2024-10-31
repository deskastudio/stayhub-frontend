import React from "react";

interface AjuanItem {
  id: number;
  nama: string;
  noKamar: string;
  perihal: string;
  tanggal: string;
  status: string;
}

interface AjuanTableProps {
  data: AjuanItem[]; // Pastikan properti data didefinisikan dengan benar
}

const DataTable: React.FC<AjuanTableProps> = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
      <thead className="bg-primary-dark text-white">
        <tr>
          <th className="p-4 text-center">Nama</th> {/* Padding yang lebih besar */}
          <th className="p-4 text-center">No Kamar</th> {/* Padding yang lebih besar */}
          <th className="p-4 text-center">Perihal</th> {/* Padding yang lebih besar */}
          <th className="p-4 text-center">Tanggal</th>
          <th className="p-4 text-center">Status</th> {/* Padding yang lebih besar */}
          <th className="p-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center border-b">
            <td className="p-4">{item.nama}</td> {/* Padding yang lebih besar */}
            <td className="p-4">{item.noKamar}</td> {/* Padding yang lebih besar */}
            <td className="p-4">{item.perihal}</td> {/* Padding yang lebih besar */}
            <td className="p-4">{item.tanggal}</td>
            <td className="p-4">
              <div className="flex items-center justify-center h-full">
                <span className={`w-32 h-8 rounded-lg flex items-center justify-center ${item.status === "Menunggu" ? "bg-red-200" : item.status === "Selesai" ? "bg-green-200" : "bg-gray-200 text-gray-700"}`}>{item.status}</span>
              </div>
            </td>
            <td className="p-4 space-x-2">
              <button className="bg-gray-100 p-2 rounded">Detail</button>
              <button className="bg-primary text-white p-2 rounded">Balas</button>
              <button className="bg-red-700 text-white p-2 rounded">Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;

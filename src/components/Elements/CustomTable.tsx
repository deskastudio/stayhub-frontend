import React from "react";

// Definisi interface untuk data item
export interface DataItem {
  foto: string;
  nama: string;
  noHp: string;
  email: string;
  status: string;
  id: string;
  noKamar: string;
  fasilitas: string;
  jumlah: string;
  dipakai: string;
  gambar: string;
  aksi: string;
}

// Komponen Tabel yang dapat dikustomisasi
interface TableProps {
  columns: string[];  // Kolom yang ditampilkan
  data: DataItem[];   // Data yang ditampilkan
}

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  const renderColumn = (column: string, item: DataItem) => {
    switch (column) {
      case "Foto":
        return <img src={item.foto} alt={item.nama} className="w-12 h-12 rounded-full" />;
      case "Nama":
        return item.nama;
      case "No Hp":
        return item.noHp;
      case "Email":
        return item.email;
      case "ID":
        return item.id;
      case "No Kamar":
        return item.noKamar;
      case "Fasilitas":
        return item.fasilitas;
      case "Jumlah":
        return item.jumlah;
      case "Dipakai":
        return item.dipakai;
      case "Gambar":
        return item.gambar;
      case "Status":
        return (
          <span
            className={`px-2 py-1 rounded ${
              item.status === "Aktif" ? "bg-green-200 text-green-700" : "bg-gray-200 text-gray-700"
            }`}
          >
            {item.status}
          </span>
        );
      case "Aksi":
        return item.aksi;
      default:
        return "-";
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white rounded-xl border-collapse shadow-md">
        <thead className="bg-primary-dark text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-4 text-center text-md font-semibold">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition-all">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-4 text-center text-sm font-medium text-gray-700">
                  {renderColumn(column, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;

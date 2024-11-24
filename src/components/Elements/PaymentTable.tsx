import React from "react";

interface PaymentItem {
  idBayar: string; 
  typeKamar: string;
  noKamar: string;
  jatuhTempo: string;
  status: string;
  total: string;
}

interface PaymentTableProps {
  data: PaymentItem[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
        <thead className="bg-primary-dark text-white">
          <tr>
            <th className="p-4 text-center">ID Bayar</th>
            <th className="p-4 text-center">Tipe Kamar</th>
            <th className="p-4 text-center">No Kamar</th>
            <th className="p-4 text-center">Jatuh Tempo</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Total</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idBayar} className="text-center border-b">
              <td className="p-4">{item.idBayar}</td>
              <td className="p-4">{item.typeKamar}</td>
              <td className="p-4">{item.noKamar}</td>
              <td className="p-4">{item.jatuhTempo}</td>
              <td className="p-4">
                <div className="flex items-center justify-center h-full">
                  <span
                    className={`w-32 h-8 rounded-lg flex items-center justify-center ${
                      item.status === "Belum bayar"
                        ? "bg-red-200 text-red-700"
                        : item.status === "Lunas"
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </td>
              <td className="p-4">{item.total}</td>
              <td className="p-4 space-x-2">
                <button className="bg-primary text-white py-2 px-3 rounded-lg shadow-sm">
                  Kirim Tagihan
                </button>
                <button className="bg-primary-dark text-white py-2 px-3 rounded-lg shadow-sm">
                  Cetak PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;

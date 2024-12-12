
import { format } from "date-fns";
import Button from "../Elements/Button";

export interface PaymentItem {
  id: string;
  date: string;
  status: string;
}

interface PaymentTableProps {
  data: PaymentItem[];
}

const PaymentTableUser: React.FC<PaymentTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
        <thead className="bg-primary-dark text-white">
          <tr>
            <th className="p-4 text-center">ID Bayar</th>
            <th className="p-4 text-center">Tanggal</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Tidak ada data pembayaran
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 text-center">{item.id}</td>
                <td className="p-4 text-center">{format(new Date(item.date), "dd/MM/yyyy")}</td>
                <td className="p-4 text-center w-32">
                  <span className={`w-32 h-8 rounded-lg flex items-center justify-center ${item.status === "Lunas" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{item.status}</span>
                </td>
                <td className="p-4 text-center">
                  <Button variant={item.status === "Lunas" ? "disabled" : "primary"} onClick={() => console.log(item.status === "Lunas" ? "Selesai" : "Bayar", item.id)}>
                    {item.status === "Lunas" ? "Selesai" : "Bayar"}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTableUser;

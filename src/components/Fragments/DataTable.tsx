
import AjuanTable from "../Elements/AjuanTable";

const AdminDataAjuan: React.FC = () => {
  // Contoh data
  const data = [
    { id: 1, nama: "Kevin Joe", noKamar: "301", perihal: "Fasilitas", tanggal: "22/10/24", status: "Menunggu" },
    { id: 2, nama: "Alif S", noKamar: "305", perihal: "Fasilitas", tanggal: "22/10/24", status: "Selesai" },
    { id: 3, nama: "Angel", noKamar: "203", perihal: "Keamanan", tanggal: "22/10/24", status: "Menunggu" },
    { id: 4, nama: "Ayu L", noKamar: "109", perihal: "Lainnya", tanggal: "22/10/24", status: "Selesai" },
    { id: 5, nama: "M.Yoga", noKamar: "205", perihal: "Fasilitas", tanggal: "22/10/24", status: "Menunggu" },
    { id: 6, nama: "Yosi", noKamar: "201", perihal: "Kegaduhan", tanggal: "22/10/24", status: "Selesai" },
  ];

  return (
    <div className="p-8">
    
      <AjuanTable data={data} />
    </div>
  );
};

export default AdminDataAjuan;

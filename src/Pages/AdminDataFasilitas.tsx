import { DataItem } from '../components/Elements/CustomTable';
import CustomTable from '../components/Elements/CustomTable';
import ProfileInfo from '../components/Elements/ProfileInfo';


const AdminDataFasilitas: React.FC = () => {

    const fasilityColumns = ["ID","Fasilitas", "Jumlah", "Dipakai", "Gambar", "Aksi"];
    const dummyFasilitasData: DataItem[] = [
        { id: "1", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "2", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "3", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "4", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "5", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "6", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "7", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "8", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "9", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
        { id: "10", fasilitas: "Kamar", jumlah: "10", dipakai: "10", gambar: "-", aksi: "-" },
    ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Fasilitas Kost</h1>
        <ProfileInfo />
      </div>

      <CustomTable columns={fasilityColumns} data={dummyFasilitasData as DataItem[]} />


     
    </div>
  );
};

export default AdminDataFasilitas;

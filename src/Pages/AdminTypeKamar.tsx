import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../components/Elements/CustomTable";
import PopupTambahTypeKamar from "../components/Fragments/PopupTambahTypeKamar";
import ProfileInfo from "../components/Elements/ProfileInfo";
import Button from "../components/Elements/Button";

interface Fasilitas {
  id: string;
  nama: string;
}

interface TypeKamar {
  id: string;
  namaTipe: string;
  fasilitas: Fasilitas[];
  deskripsi: string;
  harga: number;
}

const AdminTypeKamar: React.FC = () => {
  const [typeKamarData, setTypeKamarData] = useState<TypeKamar[]>([]);
  const [fasilitasData, setFasilitasData] = useState<Fasilitas[]>([]); // Data fasilitas
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentData, setCurrentData] = useState<TypeKamar | null>(null);

  const fetchData = async () => {
    try {
      const typeKamarResponse = await axios.get("http://localhost:8000/type-kamar");
      const fasilitasResponse = await axios.get("http://localhost:8000/facility");
      setTypeKamarData(typeKamarResponse.data.data);
      setFasilitasData(fasilitasResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTypeKamar = async (data: TypeKamar) => {
    try {
      await axios.post("http://localhost:8000/type-kamar", data);
      fetchData();
      alert("Tipe kamar berhasil ditambahkan!");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding type kamar:", error);
      alert("Gagal menambahkan tipe kamar.");
    }
  };

  const handleEditTypeKamar = (data: TypeKamar) => {
    setCurrentData(data);
    setIsPopupOpen(true); // Membuka popup dalam mode edit
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tipe kamar ini?")) {
      try {
        await axios.delete(`http://localhost:8000/type-kamar/${id}`);
        fetchData();
        alert("Tipe kamar berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting type kamar:", error);
        alert("Gagal menghapus tipe kamar.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = ["Nama Tipe Kamar", "Fasilitas", "Deskripsi", "Harga", "Aksi"];

  const formatTableData = (data: TypeKamar[]) =>
    data.map((item) => ({
      "Nama Tipe Kamar": item.namaTipe,
      Fasilitas: item.fasilitas.map((fasilitas) => fasilitas.nama).join(", "),
      Deskripsi: item.deskripsi,
      Harga: `Rp ${item.harga.toLocaleString()}`,
      Aksi: (
        <div className="flex items-center justify-center space-x-2">
          <Button variant="primary" onClick={() => handleEditTypeKamar(item)}>
            Edit
          </Button>
          <Button variant="deleted" onClick={() => handleDelete(item.id)}>
            Hapus
          </Button>
        </div>
      ),
    }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Data Tipe Kamar</h1>
        <ProfileInfo />
      </div>
      <div className="flex justify-end mb-4">
        <Button variant="add" onClick={() => {
          setCurrentData(null); // Menetapkan currentData menjadi null agar form kosong saat tambah
          setIsPopupOpen(true);
        }}>
          Tambah Tipe Kamar
        </Button>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <CustomTable columns={columns} data={formatTableData(typeKamarData)} itemsPerPage={5} />
      )}
      <PopupTambahTypeKamar
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddTypeKamar}
        currentData={currentData} // Jika ada data, form akan diisi untuk edit
        fasilitasData={fasilitasData} // Kirim data fasilitas ke popup
      />
    </div>
  );
};

export default AdminTypeKamar;

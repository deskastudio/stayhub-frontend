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

  // Fungsi untuk mengambil data fasilitas
  const fetchFasilitas = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/facility");
      const fasilitasTransformed = response.data.data.map((item: any) => ({
        id: item.id,
        nama: item.name, // Ubah `name` ke `nama`
      }));
      setFasilitasData(fasilitasTransformed);
      console.log("Data fasilitas berhasil diambil:", fasilitasTransformed);
    } catch (error) {
      console.error("Error fetching fasilitas data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFasilitas(); // Ambil data fasilitas saat komponen dimuat
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/type");
      console.log("Respons dari backend:", response.data);
  
      const transformedData = response.data.data.map((item) => ({
        id: item.id,
        namaTipe: item.name, // Pastikan properti ini sesuai dengan backend
        fasilitas: item.facility.map((fasilitasItem) => ({
          id: fasilitasItem._id, // Gunakan `_id` jika dari MongoDB
          nama: fasilitasItem.name,
        })),
        deskripsi: item.description,
        harga: item.cost,
      }));
      console.log("Data yang sudah ditransformasi:", transformedData);
      setTypeKamarData(transformedData);
    } catch (error) {
      console.error("Error fetching type kamar data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Ambil data tipe kamar saat halaman dimuat
  }, []);
  

  const handleAddTypeKamar = async (data: TypeKamar) => {
    const payload = {
      name: data.namaTipe, // Sesuaikan nama field dengan backend
      facility: data.fasilitas.map((f) => f.nama), // Kirim nama fasilitas
      description: data.deskripsi,
      cost: data.harga,
    };
  
    console.log("Payload yang dikirim ke backend:", payload); // Tambahkan log
  
    try {
      await axios.post("http://localhost:8000/type/add", payload);
      fetchData();
      alert("Tipe kamar berhasil ditambahkan!");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding type kamar:", error.response?.data || error.message);
      alert("Gagal menambahkan tipe kamar.");
    }
  };
  
  

  const handleEditTypeKamar = (data: TypeKamar) => {
    setCurrentData(data); // Tetapkan data yang akan diedit
    setIsPopupOpen(true); // Buka popup edit
  };  

  const handleDeleteTypeKamar = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tipe kamar ini?')) {
      try {
        await axios.delete(`http://localhost:8000/type/delete/${id}`);
        alert('Tipe kamar berhasil dihapus!');
        fetchData(); // Refresh data setelah hapus
      } catch (error) {
        console.error('Error deleting type kamar:', error.response?.data || error.message);
        alert(error.response?.data.message || 'Gagal menghapus tipe kamar.');
      }
    }
  };
  
  

  const columns = ['Nama Tipe Kamar', 'Fasilitas', 'Deskripsi', 'Harga', 'Aksi'];

const formatTableData = (data: TypeKamar[]) =>
  data.map((item) => ({
    'Nama Tipe Kamar': item.namaTipe,
    Fasilitas: item.fasilitas.map((f) => f.nama).join(', ') || 'Tidak ada fasilitas',
    Deskripsi: item.deskripsi || 'Tidak ada deskripsi',
    Harga: `Rp ${item.harga.toLocaleString()}`,
    Aksi: (
      <div className="flex gap-2">
        <Button variant="primary" onClick={() => handleEditTypeKamar(item)}>
          Edit
        </Button>
        <Button variant="deleted" onClick={() => handleDeleteTypeKamar(item.id)}>
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
      ) : typeKamarData.length > 0 ? (
        <CustomTable
          columns={columns}
          data={formatTableData(typeKamarData || [])} // Default ke array kosong jika undefined
          itemsPerPage={5}
        />

      ) : (
        <p>Data tidak tersedia atau gagal dimuat.</p>
      )}

      <PopupTambahTypeKamar
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddTypeKamar}
        currentData={currentData}
        fasilitasData={fasilitasData} // Kirim data fasilitas ke PopupTambahTypeKamar
      />

    </div>
  );
};

export default AdminTypeKamar;

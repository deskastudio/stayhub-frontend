import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../components/Elements/CustomTable";
import PopupTambahFasilitas from "../components/Fragments/PopupTambahFasilitas";
import ProfileInfo from "../components/Elements/ProfileInfo";
import Button from "../components/Elements/Button";

// Tipe data fasilitas
interface Fasilitas {
  id: string;
  fasilitas: string;
}

const AdminDataFasilitas: React.FC = () => {
  const [fasilitasData, setFasilitasData] = useState<Fasilitas[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch data fasilitas dari backend
  const fetchFasilitas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fasilitas");
      setFasilitasData(response.data.data);
    } catch (error) {
      console.error("Error fetching fasilitas data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tambah fasilitas
  const handleAddFasilitas = async (fasilitas: string) => {
    try {
      await axios.post("http://localhost:8000/fasilitas", { fasilitas });
      fetchFasilitas(); // Refresh data setelah penambahan
      alert("Fasilitas berhasil ditambahkan!");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding fasilitas:", error);
      alert("Gagal menambahkan fasilitas.");
    }
  };

  // Delete fasilitas
  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus fasilitas ini?")) {
      try {
        await axios.delete(`http://localhost:8000/fasilitas/${id}`);
        fetchFasilitas(); // Refresh data setelah penghapusan
        alert("Fasilitas berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting fasilitas:", error);
        alert("Gagal menghapus fasilitas.");
      }
    }
  };

  useEffect(() => {
    fetchFasilitas();
  }, []);

  const columns = ["Nama Fasilitas", "Aksi"];

  // Format data untuk tabel
  const formatTableData = (data: Fasilitas[]) =>
    data.map((item) => ({
      "Nama Fasilitas": item.fasilitas,
      Aksi: (
        <div className="flex items-center justify-center space-x-2">
          <Button variant="deleted" onClick={() => handleDelete(item.id)}>
            Hapus
          </Button>
        </div>
      ),
    }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Fasilitas Kos</h1>
        <ProfileInfo />
      </div>
      <div className="flex justify-end mb-4">
        <Button variant="add" onClick={() => setIsPopupOpen(true)}>
          Tambah Fasilitas
        </Button>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <CustomTable columns={columns} data={formatTableData(fasilitasData)} itemsPerPage={5} />
      )}
      <PopupTambahFasilitas
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddFasilitas}
      />
    </div>
  );
};

export default AdminDataFasilitas;

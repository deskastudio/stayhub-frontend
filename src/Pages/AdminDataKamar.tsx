import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileInfo from "../components/Elements/ProfileInfo";
import TabPilihan from "../components/Fragments/TabPilihan";
import CustomTable from "../components/Elements/CustomTable";
import PopupTambahKamar from "../components/Fragments/PopupTambahKamar";

// Definisikan tipe untuk data kamar
interface Room {
  id: string;
  name: string;
  type: string;
  cost: number;
  status: string;
}

const AdminDataKamar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Silver");
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // Fetch data kamar dari backend
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/room");
      setRoomData(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hapus kamar
  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
      try {
        await axios.delete(`http://localhost:8000/room/${id}`);
        fetchRooms();
        alert("Kamar berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Gagal menghapus kamar.");
      }
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleTabClick = (label: string) => setActiveTab(label);

  const filteredRooms = roomData.filter(
    (room) => room.type.toLowerCase() === activeTab.toLowerCase()
  );

  const roomColumns = ["Nama Kamar", "Tipe Kamar", "Biaya", "Status", "Aksi"];

  const formatTableData = (data: Room[]) =>
    data.map((room) => ({
      "Nama Kamar": room.name,
      "Tipe Kamar": room.type,
      Biaya: `Rp${room.cost.toLocaleString()}`,
      Status: (
        <span
          className={`px-2 py-1 rounded ${
            room.status === "Tersedia"
              ? "bg-green-200 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {room.status}
        </span>
      ),
      Aksi: (
        <div className="flex items-center justify-center space-x-2">
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(room.id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Data Kamar</h1>
        <ProfileInfo />
      </div>

      <TabPilihan
        buttons={[
          { label: "Silver", variant: "primary" },
          { label: "Gold", variant: "secondary" },
          { label: "Platinum", variant: "secondary" },
        ]}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onAddButtonClick={() => setIsPopupOpen(true)}
        addButtonLabel="Tambah Kamar"
      />

      <div className="mt-3">
        {loading ? (
          <p>Loading data kamar...</p>
        ) : (
          <CustomTable
            columns={roomColumns}
            data={formatTableData(filteredRooms)}
            itemsPerPage={5}
          />
        )}
      </div>

      <PopupTambahKamar
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onKamarAdded={fetchRooms}
      />
    </div>
  );
};

export default AdminDataKamar;

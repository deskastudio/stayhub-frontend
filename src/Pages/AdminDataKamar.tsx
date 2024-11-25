import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileInfo from "../components/Elements/ProfileInfo";
import TabPilihan from "../components/Fragments/TabPilihan";
import CustomTable from "../components/Elements/CustomTable";
import PopupTambahKamar from "../components/Fragments/PopupTambahKamar";
import PopupEditKamar from "../components/Fragments/PopupEditKamar";
import Button from "../components/Elements/Button";

interface Room {
  id: string;
  name: string;
  type: string;
  cost: number;
  status: string;
}

interface TypeKamar {
  id: string;
  namaTipe: string;
  fasilitas: { nama: string }[];
  deskripsi: string;
  harga: number;
}

const AdminDataKamar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Silver");
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [typeKamarData, setTypeKamarData] = useState<TypeKamar[]>([]); // Data tipe kamar
  const [loading, setLoading] = useState<boolean>(true);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const roomResponse = await axios.get<Room[]>("http://localhost:8000/room");
      const typeKamarResponse = await axios.get<TypeKamar[]>("http://localhost:8000/type-kamar");
      setRoomData(roomResponse.data);
      setTypeKamarData(typeKamarResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditKamar = async (room: Room) => {
    try {
      await axios.put(`http://localhost:8000/room/${room.id}`, room);
      fetchData();
      alert("Kamar berhasil diperbarui!");
      setIsEditPopupOpen(false);
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Gagal memperbarui kamar.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
      try {
        await axios.delete(`http://localhost:8000/room/${id}`);
        fetchData();
        alert("Kamar berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Gagal menghapus kamar.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRooms = activeTab
    ? roomData.filter((room) => room.type.toLowerCase() === activeTab.toLowerCase())
    : roomData;

  const roomColumns = ["Nama Kamar", "Tipe Kamar", "Biaya", "Status", "Aksi"];

  const formatTableData = (data: Room[]) =>
    data.map((room) => ({
      "Nama Kamar": room.name,
      "Tipe Kamar": room.type,
      Biaya: `Rp${room.cost.toLocaleString()}`,
      Status: room.status === "Tersedia" ? "Tersedia" : "Tidak Tersedia",
      Aksi: (
        <div className="flex items-center justify-center space-x-2">
          <Button variant="primary" onClick={() => { setCurrentRoom(room); setIsEditPopupOpen(true); }}>
            Edit
          </Button>
          <Button variant="deleted" onClick={() => handleDelete(room.id)}>
            Hapus
          </Button>
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
        onTabClick={setActiveTab}
        onAddButtonClick={() => setIsPopupOpen(true)}
        addButtonLabel="Tambah Kamar"
      />

      {loading ? (
        <p>Loading data kamar...</p>
      ) : (
        <CustomTable columns={roomColumns} data={formatTableData(filteredRooms)} itemsPerPage={5} />
      )}

      <PopupTambahKamar
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onKamarAdded={fetchData}
      />
      <PopupEditKamar
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSubmit={handleEditKamar}
        currentData={currentRoom}
        typeKamarData={typeKamarData}
      />
    </div>
  );
};

export default AdminDataKamar;

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
  type: {
    id: string;
    name: string;
  };
  status: string;
  images: { url: string }[];
}

interface TypeKamar {
  id: string;
  name: string;
  facility: { name: string }[];
  description: string;
  cost: number;
}

const AdminDataKamar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Silver");
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [typeKamarData, setTypeKamarData] = useState<TypeKamar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const token = sessionStorage.getItem('token');

  const fetchData = async () => {
    try {
      setLoading(true);

      const roomResponse = await axios.get("http://localhost:8000/room", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const formattedRooms = roomResponse.data.data.map((room: any) => ({
        id: room.id,
        name: room.name,
        type: room.type,
        status: room.status || "Tersedia",
        images: room.images || [],
      }));

      const typeKamarResponse = await axios.get("http://localhost:8000/type", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const formattedTypeKamar = typeKamarResponse.data.data.map((type: any) => ({
        id: type.id,
        name: type.name,
        facility: type.facility.map((fasilitas: any) => ({ name: fasilitas.name })),
        description: type.description,
        cost: type.cost,
      }));

      setRoomData(formattedRooms);
      setTypeKamarData(formattedTypeKamar);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
      try {
        await axios.delete(`http://localhost:8000/room/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        fetchData();
        alert("Kamar berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Gagal menghapus kamar.");
      }
    }
  };

  const handleAddRoom = async (newRoom: FormData) => {
    try {
      console.log(newRoom);
      
      await axios.post("http://localhost:8000/room/add", newRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      fetchData();
      alert("Kamar berhasil ditambahkan!");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Gagal menambahkan kamar.");
    }
  };

  const handleEditRoom = async (updatedRoom: Room) => {
    try {
      await axios.put(`http://localhost:8000/room/update/${updatedRoom.id}`, updatedRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchData();
      alert("Kamar berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Gagal memperbarui kamar.");
    }
  };

  const filteredRooms = activeTab
  ? roomData.filter((room) => room.type?.id === activeTab || room.type?.name?.toLowerCase() === activeTab.toLowerCase())
  : roomData;

  const roomColumns = ["Nama Kamar", "Tipe Kamar", "Status", "Gambar", "Aksi"];

  const formatTableData = (data: Room[]) =>
    data.map((room) => ({
      "Nama Kamar": room.name,
      "Tipe Kamar": room.type.name,
      Status: room.status === "Tersedia" ? "Tersedia" : "Tidak Tersedia",
      Gambar: (
        <div className="flex gap-2">
          {room.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:8000${image.url}`}
              alt={`Room ${room.name}`}
              className="w-10 h-10 object-cover rounded"
            />
          ))}
        </div>
      ),
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
        buttons={typeKamarData.map((type) => ({ label: type.name, variant: "secondary" }))}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        onAddButtonClick={() => setIsPopupOpen(true)}
        addButtonLabel="Tambah Kamar"
      />

      {loading ? (
        <p>Loading data kamar...</p>
      ) : (
        <CustomTable columns={roomColumns} data={formatTableData(roomData)} itemsPerPage={5} />
      )}

      <PopupTambahKamar
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onKamarAdded={fetchData}
        onAddRoom={handleAddRoom}
        typeKamarData={typeKamarData}
      />
      <PopupEditKamar
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        currentData={currentRoom}
        typeKamarData={typeKamarData} // Kirim tipe kamar ke popup edit kamar
      />
    </div>
  );
};

export default AdminDataKamar;
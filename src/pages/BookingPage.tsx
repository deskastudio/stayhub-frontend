import React, { useState, useEffect } from "react";
import Button from "../components/Elements/ButtonLanding";
import BookingModal from "../components/Fragments/BookingModal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface Facility {
  name: string;
}

interface RoomTypeData {
  id: string;
  name: string;
  images: { url: string }[];
  type: {
    _id: string;
    name: string;
    facility: Facility[];
    description: string;
    cost: number;
    rooms?: string[];
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  complaints: any[];
  reviews: any[];
}

const BookingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get("roomId");
  const queryRoomNumber = searchParams.get("roomNumber") || "";
  const queryStartDate = searchParams.get("startDate") || "";

  const [room, setRoom] = useState<RoomTypeData | null>(null);

  // Data form - kita akan isi ini dari database
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(queryRoomNumber);
  const [startDate, setStartDate] = useState(queryStartDate);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) return;
      try {
        const response = await axios.get(`http://localhost:8000/room/${roomId}`);
        const roomData = response.data.data || response.data;
        setRoom(roomData);
        if (roomData.type && roomData.type[0]) {
          setSelectedRoomType(roomData.type[0].name);
          // Jika belum ada selectedRoomNumber dari query, gunakan nomor pertama
          if (!selectedRoomNumber && roomData.type[0].rooms && roomData.type[0].rooms.length > 0) {
            setSelectedRoomNumber(roomData.type[0].rooms[0]);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data kamar:", err);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda belum login');
      return;
    }

    if (!roomId) {
      alert('Room ID tidak ditemukan');
      return;
    }

    // Data yang akan dikirim ke backend (sesuaikan dengan kebutuhan backend)
    const payload = {
      roomNumber: selectedRoomNumber,
      startDate: startDate,
      fullName: fullName,
      email: userEmail,
      phone: userPhone,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(`http://localhost:8000/transaction/callback/${roomId}`, payload, config);
      console.log("Booking berhasil:", response.data);
      openModal();
    } catch (error: any) {
      console.error("Gagal booking:", error.response ? error.response.data : error.message);
      alert("Terjadi kesalahan saat melakukan booking");
    }
  };

  const availableRooms = room && room.type && room.type[0] && room.type[0].rooms ? room.type[0].rooms : [];
  const roomCost = room && room.type && room.type[0] ? room.type[0].cost : 0;

  return (
    <>
      <div className="shadow-md rounded-b-xl sticky top-0 w-full z-10 bg-default">
        <div className="container flex justify-center items-center py-4">
          <img src="/stayhub-logo2.png" alt="" />
        </div>
      </div>
      <div className="px-20 py-10 flex">
        <div className="w-1/3 flex justify-between">
          <form className="space-y-8 w-11/12">
            <div className="space-y-4">
              <div>
                <label className="block mb-3 font-medium text-lg">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukan nama lengkap"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">
                  No Telepon
                </label>
                <input
                  type="text"
                  placeholder="Masukan no telepon"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">
                  Pilih Type Kamar
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300"
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                  >
                    {room && room.type && room.type.map((t) => (
                      <option key={t._id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                  <span className="absolute top-1/4 right-4 flex items-center pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">
                  Pilih Nomor Kamar
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300"
                    value={selectedRoomNumber}
                    onChange={(e) => setSelectedRoomNumber(e.target.value)}
                  >
                    {availableRooms.length > 0 ? (
                      availableRooms.map((num, i) => (
                        <option key={i} value={num}>Kamar {num}</option>
                      ))
                    ) : (
                      <option>Tidak ada kamar tersedia</option>
                    )}
                  </select>
                  <span className="absolute top-1/4 right-4 flex items-center pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">
                  Mulai Kos
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="border-r-2 border-gray-200 w-1/12"></div>
        </div>
        <div className="w-2/3 flex justify-center">
          <div className="flex flex-col justify-between">
            <table className="w-[800px]">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-lg font-bold">
                    Type Kamar
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-lg font-bold">
                    No Kamar
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-lg font-bold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-gray-200">{selectedRoomType}</td>
                  <td className="py-2 px-4 border-gray-200">{selectedRoomNumber}</td>
                  <td className="py-2 px-4 border-gray-200">
                    Rp {roomCost.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2 h-6 w-6" />
              <span className="text-lg">Saya telah membaca ketentuan</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5 px-96 border-t-2">
        <div className="flex justify-between pt-5">
          <Button custom="border border-primary py-3 text-primary">
            Batal
          </Button>
          <Button custom="bg-secondary py-3 text-white" onClick={handlePayment}>
            Bayar
          </Button>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default BookingPage;

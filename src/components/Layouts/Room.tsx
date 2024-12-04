import Card2 from "../Fragments/RoomCard";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineKitchen } from "react-icons/md";
import { LiaBathSolid } from "react-icons/lia";
import { FaWifi } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";
import axios from "axios";
import { useEffect, useState } from "react";

interface Facility {
  name: string;
}

interface RoomTypeData {
  id: number;
  image: string;
  type: { name: string; facility: Facility[]; cost: number }[];
  remaining: number;
}

const Room = () => {
  const [rooms, setRooms] = useState<RoomTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:8000/room");
      setRooms(response.data.data);
      console.log("Data Room:", response.data.data);
    } catch (err) {
      console.error("Error fetching room data:", err);
      setError("Gagal mengambil data kamar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  if (loading) {
    return (
      <div className="container pb-24">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Type Kamar
        </h1>
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container pb-24">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Type Kamar
        </h1>
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div id="booking" className="container pb-24">
      <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
        Pilih Type Kamar
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card2
            key={room.id}
            image={room.image || "/silver.png"}
            type={room.type?.[0]?.name || "Tipe Tidak Tersedia"}
            remaining={"5"}
            destination={`/room/${room.id}`}
            features={[
              { icon: <IoBedOutline />, text: room.type?.[0]?.facility?.[0]?.name || "Fasilitas Tidak Ada" },
              { icon: <MdOutlineKitchen />, text: room.type?.[0]?.facility?.[1]?.name || "Fasilitas Tidak Ada" },
              { icon: <LiaBathSolid />, text: room.type?.[0]?.facility?.[2]?.name || "Fasilitas Tidak Ada" },
              { icon: <FaWifi />, text: room.type?.[0]?.facility?.[3]?.name || "Fasilitas Tidak Ada" },
              { icon: <TbAirConditioning />, text: room.type?.[0]?.facility?.[4]?.name || "Fasilitas Tidak Ada" },
            ]}
            price={`Rp. ${room.type?.[0]?.cost || "0"} / Bulan`}
          />
        ))}
      </div>
    </div>
  );
};

export default Room;

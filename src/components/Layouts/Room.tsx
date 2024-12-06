import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWifi } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { MdOutlineKitchen } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { Link } from "react-router-dom";

interface Facility {
  name: string;
}

interface RoomType {
  _id: string;
  name: string;
  facility: Facility[];
  description: string;
  cost: number;
}

interface Image {
  url: string;
}

interface RoomTypeData {
  id: string;
  name: string;
  images: Image[];
  type: RoomType[];
  status: string;
  createdAt: string;
  updatedAt: string;
  complaints: any[];
  reviews: any[];
}

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<RoomTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8000/room");
      console.log("API response:", response);
      const data = response.data.data || response.data;
      const roomsArray = Array.isArray(data) ? data : [data];
      setRooms(roomsArray);
      console.log("Data Room:", roomsArray);
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

  useEffect(() => {
    console.log("Rooms state updated:", rooms);
  }, [rooms]);

  if (loading) {
    return (
      <div className="container pb-24">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Tipe Kamar
        </h1>
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container pb-24">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Tipe Kamar
        </h1>
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="container pb-24">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Tipe Kamar
        </h1>
        <p className="text-center">Tidak ada kamar yang tersedia.</p>
      </div>
    );
  }

  const getFacilityIcon = (facilityName: string) => {
    switch (facilityName.toLowerCase()) {
      case "1 kasur":
      case "1 bed":
        return <IoBedOutline />;
      case "dapur bersama":
      case "kitchen":
        return <MdOutlineKitchen />;
      case "kamar mandi":
      case "bathroom":
        return <LiaBathSolid />;
      case "wifi":
      case "wifi cepat":
        return <FaWifi />;
      case "air conditioning":
      case "ac tersedia":
        return <TbAirConditioning />;
      default:
        return null;
    }
  };

  // Grouping rooms by their type (assuming each room has at least one type)
  const typeGroups = rooms.reduce((acc: Record<string, RoomTypeData[]>, room) => {
    const roomTypeName = room.type?.[0]?.name || "Tipe Tidak Dikenal";
    if (!acc[roomTypeName]) {
      acc[roomTypeName] = [];
    }
    acc[roomTypeName].push(room);
    return acc;
  }, {});

  // Convert grouping to an array of objects for easy mapping
  const groupedRooms = Object.keys(typeGroups).map((typeName) => {
    const roomsOfType = typeGroups[typeName];

    // Ambil data dari salah satu room, misal room pertama
    const representativeRoom = roomsOfType[0];
    const features = representativeRoom.type?.[0]?.facility?.map((facility) => ({
      icon: getFacilityIcon(facility.name),
      text: facility.name,
    })) || [];

    return {
      typeName,
      count: roomsOfType.length,
      image: representativeRoom.images?.[0]?.url || "/silver.png",
      price: `Rp. ${representativeRoom.type?.[0]?.cost?.toLocaleString("id-ID") || "0"} / Bulan`,
      destination: `/room/${representativeRoom.id}`,
      features,
    };
  });

  return (
    <div id="booking" className="container pb-24">
      <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
        Pilih Tipe Kamar
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groupedRooms.map((group, index) => (
          <RoomCard
            key={index}
            image={group.image}
            type={group.typeName}
            remaining={group.count.toString()}
            destination={group.destination}
            features={group.features}
            price={group.price}
          />
        ))}
      </div>
    </div>
  );
};

interface RoomCardProps {
  image: string;
  type: string;
  remaining: string;
  destination: string;
  features: { icon: React.ReactNode; text: string }[];
  price: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  type,
  remaining,
  destination,
  features,
  price,
}) => {
  console.log("Rendering RoomCard with props:", { image, type, remaining, destination, features, price });

  return (
    <div className="bg-default rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={`Image of ${type}`}
        className="w-full h-80 object-cover"
      />
      <div className="py-5 px-7 border border-black rounded-b-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold font-main">{type}</h2>
          <span className="text-gray-500">Sisa {remaining} kamar</span>
        </div>
        <div className="flex flex-wrap gap-6 text-gray-700 mb-8">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-48 text-center"
              >
                <i className="text-xl text-secondary">{feature.icon}</i>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))
          ) : (
            <p className="text-center">Fasilitas tidak tersedia</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-gray-500 mb-2">Mulai dari</p>
            <div className="text-lg font-bold font-main text-primary mb-4">
              {price}
            </div>
          </div>
          <div>
            <Link to={destination}>
              <button className="py-2.5 px-2.5 border font-main font-bold text-sm border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition duration-300">
                Lihat Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;

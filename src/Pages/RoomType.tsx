import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FaCalculator } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import axios from "axios";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineKitchen } from "react-icons/md";
import { LiaBathSolid } from "react-icons/lia";
import { FaWifi } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";

interface Facility {
  name: string;
}

interface RoomType {
  _id: string;
  name: string;
  facility: Facility[];
  description: string;
  cost: number;
  rooms?: string[];
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

const RoomType: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomTypeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8000/room/${id}`);
        const roomData = response.data.data || response.data;

        console.log("Room Details (Full):", roomData); // Debug
        setRoom(roomData);
        setCurrentImage(roomData.images?.[0]?.url || "/fallback-image.jpg");

        // Periksa apakah ada tipe kamar
        if (roomData.type && roomData.type[0]) {
          const availableRooms = roomData.type[0].rooms;
          if (Array.isArray(availableRooms) && availableRooms.length > 0) {
            // Pilih kamar pertama sebagai default
            setSelectedRoomNumber(availableRooms[0]);
          } else {
            // Tidak ada nomor kamar yang tersedia
            setSelectedRoomNumber(""); 
          }
        } else {
          console.warn("Data tipe kamar tidak tersedia");
        }
      } catch (error) {
        console.error("Error fetching room details", error);
        setError("Gagal mengambil detail kamar. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchRoomDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-20">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Loading...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Type Kamar
        </h1>
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container py-20">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Data Kamar Tidak Ditemukan
        </h1>
      </div>
    );
  }

  const handleBooking = () => {
    // Kirimkan roomId, selectedRoomNumber, dan startDate sebagai query params
    navigate(`/booking?roomId=${room.id}&roomNumber=${selectedRoomNumber}&startDate=${startDate}`);
  };

  const currentType = room.type && room.type[0];
  const availableRooms = currentType && currentType.rooms ? currentType.rooms : [];

  return (
    <>
      <Navbar />
      <div className="container py-20">
        <div className="flex items-center gap-4 mb-16">
          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 bg-default rounded-full shadow-md"
          >
            <i className="text-secondary text-3xl">
              <GoArrowLeft />
            </i>
          </Link>
          <p className="font-medium text-lg">
            Home / <span className="font-normal">{currentType?.name}</span>
          </p>
        </div>
        <h1 className="text-5xl font-main font-bold text-primary mb-6">
          {currentType?.name}
        </h1>
        <p className="text-gray-500 mb-6 font-medium text-lg">
          Dago Giri, Kabupaten Bandung
        </p>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-4">
            <img
              src={currentImage}
              alt={room.name}
              className="rounded-lg mb-4 w-full max-h-[510px] object-cover"
            />
            <div className="grid grid-cols-4 gap-2">
              {room.images.map((imageObj, index) => (
                <img
                  key={index}
                  src={imageObj.url}
                  alt={`Room detail ${index + 1}`}
                  className={`rounded-lg max-h-[150px] w-full object-cover cursor-pointer transition-opacity duration-300 ${
                    currentImage === imageObj.url ? "opacity-50" : ""
                  }`}
                  onClick={() => setCurrentImage(imageObj.url)}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between mt-8 md:mt-0">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="font-medium text-2xl">Mulai Pemesanan</h2>
                <h2 className="font-bold text-3xl text-primary">
                  Rp {currentType?.cost?.toLocaleString("id-ID") || "0"} / Bulan
                </h2>
              </div>
              <div className="space-y-4">
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
              </div>
              <div>
                <button
                  onClick={handleBooking}
                  type="button"
                  className="bg-primary text-white w-full py-3 rounded-lg font-bold"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Deskripsi</h2>
          <p className="mb-4 text-lg">
            {currentType?.description || "Deskripsi tidak tersedia."}
          </p>
          <div className="flex items-center mt-8 justify-between">
            <div className="flex items-center gap-5">
              <i className="text-4xl text-primary">
                <FaCalculator />
              </i>
              <span className="font-main text-xl text-secondary max-w-[270px]">
                Ingin melihat hunian secara langsung?
              </span>
            </div>
            <button className="bg-primary text-default py-3 px-4 rounded-2xl flex items-center gap-2">
              <i className="text-3xl">
                <IoChatbubbleEllipses />
              </i>
              <p className="font-bold font-main">Jadwalkan kunjungan</p>
            </button>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-4xl font-bold text-primary mb-8">Fasilitas</h2>
          <div className="flex flex-wrap gap-4 justify-start">
            {currentType?.facility?.length ? (
              currentType.facility.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 px-5 py-2 rounded-xl"
                >
                  <i className="text-primary text-3xl mr-2">
                    {getFacilityIcon(facility.name)}
                  </i>
                  <span className="text-primary font-main">{facility.name}</span>
                </div>
              ))
            ) : (
              <p className="text-center">Fasilitas tidak tersedia.</p>
            )}
          </div>
        </div>
        <div className="py-16">
          <h2 className="text-4xl font-bold text-primary mb-8">Alamat</h2>
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?... "
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomType;

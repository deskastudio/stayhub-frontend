import React from "react";
import RoomType from "../components/Layouts/RoomType";
import { IoIosBed } from "react-icons/io";
import { MdKitchen } from "react-icons/md";
import { FaBath, FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";

const RoomSilver: React.FC = () => {
  return (
    <RoomType
      title="Type Silver"
      price="Rp 600.000/bulan"
      description1="Kamar Silver adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas."
      description2="Terletak di area yang strategis, Kamar Silver memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka."
      images={[
        "silver1.jpg", 
        "silver2.jpg", 
        "silver3.jpg", 
        "silver4.jpg", 
      ]}
      facilities={[
        { text: "1 Kasur", icon: <IoIosBed /> },
        { text: "Dapur bersama", icon: <MdKitchen /> },      
        { text: "Kamar mandi", icon: <FaBath /> },
        { text: "Ada", icon: <FaWifi /> },
        { text: "Tidak ada", icon: <TbAirConditioning /> },
      ]}
    />
  );
};

export default RoomSilver;

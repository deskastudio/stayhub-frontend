import React from "react";
import RoomType from "../components/Layouts/RoomType";
import { IoIosBed } from "react-icons/io";
import { MdKitchen } from "react-icons/md";
import { FaBath, FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";

const RoomPlatinum: React.FC = () => {
  return (
    <RoomType
      title="Type Platinum"
      price="Rp 1.200.000/bulan"
      description1="Kamar Platinum adalah pilihan hunian premium yang dirancang untuk memberikan kenyamanan dan kualitas terbaik bagi penyewanya. Dengan suasana modern dan elegan, kamar ini dilengkapi dengan fasilitas lengkap, termasuk kamar mandi dalam, AC, dan Wifi cepat. Setiap detail dirancang untuk menciptakan lingkungan yang nyaman, sempurna untuk beristirahat setelah seharian beraktivitas."
      description2="Terletak di area yang strategis, Kamar Platinum  memudahkan akses ke pusat perbelanjaan, restoran, serta transportasi umum. Cocok bagi mahasiswa atau siapa pun yang menginginkan hunian dengan fasilitas lebih baik, Kamar Platinum memastikan kenyamanan dan kemudahan yang memenuhi kebutuhan penghuni sementara yang mencari kualitas lebih dalam hunian mereka."
      images={[
        "platinum1.jpg", 
        "platinum2.jpg", 
        "platinum3.jpg", 
        "platinum4.jpg", 
      ]}
      facilities={[
        { text: "1 Kasur", icon: <IoIosBed /> },
        { text: "Dapur pribadi", icon: <MdKitchen /> },      
        { text: "Kamar mandi", icon: <FaBath /> },
        { text: "Ada", icon: <FaWifi /> },
        { text: "Ada", icon: <TbAirConditioning /> },
      ]}
    />
  );
};

export default RoomPlatinum;

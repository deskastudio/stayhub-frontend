// import React from "react";
import Card2 from "../Fragments/RoomCard";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineKitchen } from "react-icons/md";
import { LiaBathSolid } from "react-icons/lia";
import { FaWifi } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";

const Room = () => {
  return (
    <>
      <div id="booking" className="container pb-24">
        <h1 className="text-5xl font-bold font-main text-center text-primary mb-12">
          Pilih Type Kamar
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card2
            image="/silver.png"
            type="Type Silver"
            remaining="5"
            destination="/silver"
            features={[
              { icon: <IoBedOutline />, text: "1 Kasur" },
              { icon: <MdOutlineKitchen />, text: "Dapur bersama" },
              { icon: <LiaBathSolid />, text: "Kamar Mandi" },
              { icon: <FaWifi />, text: "Tidak ada" },
              { icon: <TbAirConditioning />, text: "Tidak ada" },
            ]}
            price="Rp 600.000/bulan"
          />
          <Card2
            image="/gold.png"
            type="Type Gold"
            remaining="12"
            destination="/gold"
            features={[
              { icon: <IoBedOutline />, text: "1 Kasur" },
              { icon: <MdOutlineKitchen />, text: "Dapur bersama" },
              { icon: <LiaBathSolid />, text: "Kamar Mandi" },
              { icon: <FaWifi />, text: "Wi-fi" },
              { icon: <TbAirConditioning />, text: "1 Ac" },
            ]}
            price="Rp 900.000/bulan"
          />
          <Card2
            image="/platinum.png"
            type="Type Platinum"
            remaining="20"
            destination="/platinum"
            features={[
              { icon: <IoBedOutline />, text: "1 Kasur" },
              { icon: <MdOutlineKitchen />, text: "Dapur bersama" },
              { icon: <LiaBathSolid />, text: "Kamar Mandi" },
              { icon: <FaWifi />, text: "Wi-fi" },
              { icon: <TbAirConditioning />, text: "1 Ac" },
            ]}
            price="Rp 1.200.000/bulan"
          />
        </div>
      </div>
    </>
  );
};

export default Room;

import React, { useState } from "react";
import Button from "../components/Elements/Button";
import ProfileUser from "../components/Fragments/ProfileUser";
import BookingModal from "../components/Fragments/BookingModal";

const UserBeranda: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Hello Kevin Joe</h1>
          <p>Yuk cek tagihan kamar kosmu sekarang juga</p>
        </div>
        <ProfileUser />
      </div>
      <div className="mb-10">
        <Button variant="primary" onClick={openModal}>Lakukan pembayaran</Button>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="overflow-x-auto w-full">
        <div className="flex space-x-4">
          <div className="bg-blue-50 p-4 rounded-lg flex-1 space-y-5">
            <p className="font-semibold">Tagihan bulan ini: Oktober</p>
            <div className="flex gap-5 items-center">
              <p className="text-xl font-bold">Belum Lunas</p>
              <img src="icon/cross-red.svg" alt="" />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg flex-1 space-y-5">
            <p className="font-semibold">
              Kamu belum membayar tagihan bulan ini
            </p>
            <div className="flex gap-5 items-center">
              <p className="text-xl font-bold">Rp 900.000</p>
              <img src="icon/money.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <p className="font-semibold text-lg">Detail Penyewaan:</p>
          <p className="mt-2">Nomor Kamar : GOLD-001</p>
          <p className="mt-2">Tipe Kamar : Gold</p>
          <p className="mt-2">Tarif Kamar: Rp 900.000</p>
          <p className="mt-2">Tanggal Penyewaan: 2024-10-01</p>
          <p className="mt-2">Tanggal Akhir Sewa: 2024-11-01</p>
        </div>
      </div>
    </div>
  );
};

export default UserBeranda;

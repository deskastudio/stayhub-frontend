import React, { useState } from "react";
import Button from "../components/Elements/Button";
import BookingModal from "../components/Fragments/BookingModal";

const BookingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
                />
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
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
                />
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">
                  Pilih Type Kamar
                </label>
                <div className="relative">
                  <select className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300">
                    <option>Kamar Silver</option>
                    <option>Kamar Gold</option>
                    <option selected>Kamar Platinum</option>
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
                  <select className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300">
                    <option>Kamar 101</option>
                    <option>Kamar 102</option>
                    <option selected>Kamar 301</option>
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
                  <td className="py-2 px-4 border-gray-200">Type Platinum</td>
                  <td className="py-2 px-4 border-gray-200">Kamar 301</td>
                  <td className="py-2 px-4 border-gray-200">Rp 1.500.000</td>
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
          <Button custom="bg-secondary py-3 text-white" onClick={openModal}>Bayar</Button>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default BookingPage;

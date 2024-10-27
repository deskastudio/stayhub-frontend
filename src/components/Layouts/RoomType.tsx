import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "../Elements/Button";
import { GoArrowLeft } from "react-icons/go";
import { FaCalculator } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";

interface RoomTypeProps {
  title: string;
  description1: string;
  description2: string;
  images: string[];
  facilities: { icon: React.ReactNode; text: string }[];
}

const RoomType: React.FC<RoomTypeProps> = ({
  title,
  description1,
  description2,
  images,
  facilities,
}) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <>
      <Navbar />
      <div className="container py-20">
        <div className="flex items-center gap-4 mb-16">
          <Link to="/" className="flex items-center justify-center w-12 h-12 bg-default rounded-full shadow-md"
          >
            <i className="text-secondary text-3xl">
              <GoArrowLeft />
            </i>
          </Link>
          <p className="font-medium text-lg">
            Home / <span className="font-normal">{title}</span>
          </p>
        </div>
        <h1 className="text-5xl font-main font-bold text-primary mb-6">
          {title}
        </h1>
        <p className="text-gray-500 mb-6 font-medium text-lg">
          Dago Giri, Kabupaten Bandung
        </p>
        <div className="flex">
          <div className="w-2/3 pr-4">
            <img
              src={currentImage}
              alt={title}
              className="rounded-lg mb-4 w-full max-h-[510px] object-cover"
            />
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room detail ${index + 1}`}
                  className={`rounded-lg max-h-[150px] w-full object-cover cursor-pointer transition-opacity duration-300 ${
                    currentImage === image ? "opacity-50" : ""
                  }`}
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <form className=" space-y-4">
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
                  Mulai Kos
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block mb-3 font-medium text-lg">
                  Pilih Kamar
                </label>
                <div className="relative">
                  <select className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300">
                    <option>Kamar 101</option>
                    <option>Kamar 102</option>
                    <option>Kamar 103</option>
                  </select>
                  <span className="absolute top-1/4 right-4 flex items-center pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>

              <Button type="submit" custom="bg-primary text-white w-full py-3">
                Ajukan Sewa
              </Button>
            </form>
          </div>
        </div>
        <div className="py-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Deskripsi</h2>
          <p className="mb-4 text-lg">{description1}</p>
          <p className="mb-4 text-lg">{description2}</p>
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
          <div className="flex gap-4 justify-start">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 px-5 py-2 rounded-xl"
              >
                <i className="text-primary text-3xl mr-2">{facility.icon}</i>
                <span className="text-primary font-main">{facility.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="py-16">
          <h2 className="text-4xl font-bold text-primary mb-8">Alamat</h2>
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6663474945994!2d106.82457866088892!3d-6.17540301048826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2db8c5617%3A0x4e446b7ac891d847!2sMonas%2C%20Gambir%2C%20Kecamatan%20Gambir%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1729961092740!5m2!1sid!2sid"
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

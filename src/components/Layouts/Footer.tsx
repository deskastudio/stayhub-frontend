// import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa6";

const ListMenu = [
  {
    id: 1,
    title: "Beranda",
    link: "/",
  },
  {
    id: 2,
    title: "Tentang Kami",
    link: "#about",
  },
  {
    id: 3,
    title: "Booking",
    link: "#booking",
  },
  {
    id: 4,
    title: "Kontak",
    link: "#contact",
  },
];

const Footer = () => {
  return (
    <>
      <div id="contact" className="container py-24">
        <div className="flex justify-between gap-12 border-t-2 py-10">
          <div className="">
            <img
              src="/stayhub-logo2.png"
              alt="Stayhub logo"
              width="140"
              height="46"
              className="mb-4"
            />
            <p className="text-gray-500 max-w-[340px]">
              Menciptakan Platform Pengelolaan Kos yang Memudahkan dan
              Meningkatkan Kepercayaan!
            </p>
          </div>
          <div className="">
            <h3 className="text-secondary font-bold mb-4 font-main text-lg">
              Stayhub
            </h3>
            <ul className="text-gray-700 font-medium space-y-3">
            {ListMenu.map((item) => {
              return (
                <li key={item.id}>
                  <a className="mb-2" href={item.link}>
                    {item.title}
                  </a>
                </li>
              );
            })}
            </ul>
          </div>
          <div className="flex flex-col gap-4 max-w-[340px]">
            <h3 className="text-secondary font-bold font-main text-lg">
              Hubungi Kami
            </h3>
            <div className="flex gap-4 items-center">
              <i className="text-secondary text-xl">
                <FaLocationDot />
              </i>
              <p>
                Jl. Dago Giri No.102, Mekarwangi, Kec. Lembang, Kabupaten
                Bandung Barat, Jawa Barat 40391
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <i className="text-secondary text-xl">
                  <IoCall />
                </i>
              </div>
              <p>+6285156567246</p>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <i className="text-secondary text-xl">
                  <MdEmail />
                </i>
              </div>
              <p>stayhub@gmail.com</p>
            </div>
          </div>
          <div className="">
            <h3 className="text-secondary font-bold font-main text-lg mb-4">
              Kontak
            </h3>
            <p className="text-gray-700 mb-4 max-w-[340px]">
              Ikuti kami di media sosial untuk mendapatkan informasi terbaru dan
              penawaran menarik!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary">
                <i className="text-xl">
                  <FaFacebook />
                </i>
              </a>
              <a href="#" className="text-secondary">
                <i className="text-xl">
                  <AiFillInstagram />
                </i>
              </a>
              <a href="#" className="text-secondary">
                <i className="text-xl">
                  <MdEmail />
                </i>
              </a>
              <a href="#" className="text-secondary">
                <i className="text-xl">
                  <FaYoutube />
                </i>
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto px-4 mt-8 text-center">
          <p className="text-secondary font-main">
            Copyright© 2024 | Stayhub Crew
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

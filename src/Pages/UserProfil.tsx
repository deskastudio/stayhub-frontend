import React, { useState } from "react";
import ProfileUser from "../components/Fragments/ProfileUser";
import Button from "../components/Elements/Button";

const UserProfil: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPasswordVisibility = () =>
    setShowOldPassword(!showOldPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);

  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profil Saya</h1>
        <ProfileUser />
      </div>
      <div className="overflow-x-auto w-full">
        <div className="bg-white py-9 px-16 rounded-lg mt-6">
          <h2 className="text-xl font-bold">Profil Pengguna</h2>
          <form className="mt-5">
            <div className="flex items-center gap-5 mb-5">
              <img
                src="profile.png"
                alt=""
                className="w-20 h-20 rounded-full"
              />
              <div className="bg-primary rounded-lg">
                <input
                  type="file"
                  id="choose-photo"
                  name="profilePhoto"
                  className="hidden"
                />
                <label
                  htmlFor="choose-photo"
                  className="cursor-pointer text-white font-medium py-2 px-4 block"
                >
                  Pilih Foto
                </label>
              </div>
            </div>
            <div className="flex sm:flex-wrap md:flex-nowrap gap-10">
              <div className="flex flex-col flex-grow justify-between w-1/2 gap-5">
                <div>
                  <label className="block mb-3 font-medium text-lg">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Masukan nama lengkap"
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
                    name="phoneNumber"
                    placeholder="Masukan no telepon"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-3 font-medium text-lg">
                    Password Lama
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Masukkan password lama"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                    <i
                      onClick={toggleOldPasswordVisibility}
                      className="cursor-pointer"
                    >
                      <img
                        className="absolute right-3 top-3"
                        src={
                          showOldPassword
                            ? "icon/eye-off.svg"
                            : "icon/eye-on.svg"
                        }
                        alt="Toggle Password Visibility"
                      />
                    </i>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 font-medium text-lg">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Masukkan password baru"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                    <i
                      onClick={toggleNewPasswordVisibility}
                      className="cursor-pointer"
                    >
                      <img
                        className="absolute right-3 top-3"
                        src={
                          showNewPassword
                            ? "icon/eye-off.svg"
                            : "icon/eye-on.svg"
                        }
                        alt="Toggle Password Visibility"
                      />
                    </i>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 gap-5">
                <div className="flex flex-col h-1/2">
                  <label className="block mb-3 font-medium text-lg">
                    Alamat
                  </label>
                  <textarea
                    name="address"
                    placeholder="Masukan Alamat"
                    className="w-full h-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                    required
                  ></textarea>
                </div>
                <div className="flex flex-col h-1/2">
                  <label className="font-medium text-lg block mb-3">
                    Foto KTP
                  </label>
                  <label
                    htmlFor="uploadKTP"
                    className="w-full h-full p-3 border rounded-lg mt-1 cursor-pointer flex flex-col items-center justify-center"
                  >
                    <img
                      src="icon/rounded-plus.svg"
                      alt="Tambah KTP"
                      width={40}
                    />
                    <p>Tambahkan foto KTP</p>
                  </label>
                  <input
                    type="file"
                    id="uploadKTP"
                    name="ktpPhoto"
                    className="hidden"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" variant="primary">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;

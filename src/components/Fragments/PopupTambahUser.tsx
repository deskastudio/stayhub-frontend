import React, { useState } from "react";

interface PopupTambahUserProps {
  isOpen: boolean; // Untuk menentukan apakah popup terbuka atau tidak
  onClose: () => void; // Fungsi untuk menutup popup
  onUserAdded: () => void; // Callback setelah user berhasil ditambahkan
}

const PopupTambahUser: React.FC<PopupTambahUserProps> = ({ isOpen, onClose, onUserAdded }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Kirim data user ke backend
      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          email,
          noHp,
          password,
          role: "Member", // Default role
        }),
      });

      if (response.ok) {
        alert("User berhasil ditambahkan!");
        onUserAdded(); // Refresh data
        onClose(); // Tutup popup
      } else {
        alert("Gagal menambahkan user. Coba lagi.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2">Pendaftaran Akun User</h2>
        <p className="text-gray-500 mb-4">Mohon isi data berikut dengan benar.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukan Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="Masukan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">No HP</label>
            <input
              type="tel"
              placeholder="Masukkan No HP"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Buat Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Daftar Akun"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupTambahUser;

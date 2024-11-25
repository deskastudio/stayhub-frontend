import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileInfo from "../components/Elements/ProfileInfo";
import TabPilihan from "../components/Fragments/TabPilihan";
import PopupTambahUser from "../components/Fragments/PopupTambahUser";
import CustomTable from "../components/Elements/CustomTable";

interface User {
  id: string;
  nama: string;
  noHp: string;
  email: string;
  status: string;
  role: string;
}

const AdminDataUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Member");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [members, setMembers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data user dari backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/list/user"); // Ganti URL sesuai backend
      const users = response.data.data;

      // Filter data berdasarkan role
      const memberData = users.filter((user: User) => user.role === "Member");
      const adminData = users.filter((user: User) => user.role === "Admin");

      setMembers(memberData);
      setAdmins(adminData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle tambah user (refresh data setelah user ditambahkan)
  const handleUserAdded = () => {
    fetchUsers();
    setIsPopupOpen(false);
  };

  // Handle tab change
  const handleTabClick = (label: string) => setActiveTab(label);

  // Delete user
  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`http://localhost:8000/user/${id}`);
        fetchUsers(); // Refresh data setelah delete
        alert("User berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = ["Nama", "No Hp", "Email", "Status", "Aksi"];

  // Format data untuk tabel
  const formatTableData = (data: User[]) =>
    data.map((user) => ({
      Nama: user.nama,
      "No Hp": user.noHp,
      Email: user.email,
      Status: (
        <span
          className={`px-2 py-1 rounded ${
            user.status === "Active"
              ? "bg-green-200 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {user.status}
        </span>
      ),
      Aksi: (
        <div className="flex items-center justify-center space-x-2">
          <button className="text-yellow-500 hover:text-yellow-700">
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(user.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Penghuni Kost</h1>
        <ProfileInfo />
      </div>

      <TabPilihan
        buttons={[
          { label: "Member", variant: "primary" },
          { label: "Admin", variant: "secondary" },
        ]}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onAddButtonClick={() => setIsPopupOpen(true)}
        addButtonLabel="Tambah User"
      />


      <PopupTambahUser
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onUserAdded={handleUserAdded}
      />

      {loading ? (
        <p>Loading data...</p>
      ) : activeTab === "Member" ? (
        <CustomTable columns={columns} data={formatTableData(members)} />
      ) : (
        <CustomTable columns={columns} data={formatTableData(admins)} />
      )}
    </div>
  );
};

export default AdminDataUser;

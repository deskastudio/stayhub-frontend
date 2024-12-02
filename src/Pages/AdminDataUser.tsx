import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileInfo from "../components/Elements/ProfileInfo";
import TabPilihan from "../components/Fragments/TabPilihan";
import PopupTambahUser from "../components/Fragments/PopupTambahUser";
import CustomTable from "../components/Elements/CustomTable";
import { set } from "date-fns";

interface User {
  id: string;
  fullName: string;
  phone: number;
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
  const [error, setError] = useState<string | null>(null);

  // Fetch data user dari backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8000/list/user", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      const users = response.data.data;
      setMembers(users.filter((user: User) => user.role === "user"));
      console.log(users);
      

      setMembers(users.filter((user: User) => user.role === "Member"));
      setAdmins(users.filter((user: User) => user.role === "Admin"));
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Gagal mengambil data user.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
    setIsPopupOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`http://localhost:8000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        fetchUsers();
        alert("User berhasil dihapus!");
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Gagal menghapus user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = ["Nama", "No Hp", "Email", "Status", "Aksi"];

  const formatTableData = (data: User[]) =>
    data.map((user) => ({
      Nama: user.fullName,
      "No Hp": user.phone,
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
        onTabClick={setActiveTab}
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
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CustomTable
          columns={columns}
          data={formatTableData(activeTab === "Member" ? members : admins)}
        />
      )}
    </div>
  );
};

export default AdminDataUser;

import React, { useState } from 'react';
import ProfileInfo from '../components/Elements/ProfileInfo';
import TabPilihan from '../components/Fragments/TabPilihan';
import CustomTable, { DataItem } from "../components/Elements/CustomTable";



const AdminDataUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Member"); // Menyimpan tab yang aktif

  // Fungsi untuk mengubah tab aktif
  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  // Pilih kolom yang ingin ditampilkan untuk Member dan Admin
  const memberColumns = ["Foto", "Nama", "No Hp", "Email", "Status", "Aksi"];
  const adminColumns = ["Foto", "Nama", "No Hp", "Email", "Status", "Aksi"];

  const dummyMemberData: DataItem[] = [
    { id: "1", nama: "John Doe", noHp: "1234567890", email: "john@example.com", status: "Active", aksi: "-" },
    { id: "2", nama: "John Doe", noHp: "1234567890", email: "john@example.com", status: "Active", aksi: "-" },
    { id: "3", nama: "John Doe", noHp: "1234567890", email: "john@example.com", status: "Active", aksi: "-" },
    { id: "4", nama: "John Doe", noHp: "1234567890", email: "john@example.com", status: "Active", aksi: "-" },
    { id: "5", nama: "John Doe", noHp: "1234567890", email: "john@example.com", status: "Active", aksi: "-" },
  ];

  const dummyAdminData: DataItem[] = [
    { id: "1", nama: "Jrbreberbe", noHp: "1234rbre567890", email: "jrgvererwberbcom", status: "Active", aksi: "-" },
    { id: "2", nama: "Jrbreberbe", noHp: "1234rbre567890", email: "jrgvererwberbcom", status: "Active", aksi: "-" },
    { id: "3", nama: "Jrbreberbe", noHp: "1234rbre567890", email: "jrgvererwberbcom", status: "Active", aksi: "-" },
    { id: "4", nama: "Jrbreberbe", noHp: "1234rbre567890", email: "jrgvererwberbcom", status: "Active", aksi: "-" },
    { id: "5", nama: "Jrbreberbe", noHp: "1234rbre567890", email: "jrgvererwberbcom", status: "Active", aksi: "-" },
  ];


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Penghuni Kost</h1>
        <ProfileInfo />
      </div>

      {/* Button Section */}
      <TabPilihan
        buttons={[
          { label: "Member", variant: "primary" },
          { label: "Admin", variant: "secondary" },
        ]}
        activeTab={activeTab} // Pass activeTab ke TabPilihan
        onTabClick={handleTabClick} // Pass handleTabClick untuk mengubah tab aktif
        onAddButtonClick={() => {}}
      />

      {/* Render tabel berdasarkan tab yang aktif */}
      <div className="mt-3">
        {activeTab === "Member" && (
          <>
            <CustomTable columns={memberColumns} data={dummyMemberData as DataItem[]} />
          </>
        )}
        {activeTab === "Admin" && (
          <>
            <CustomTable columns={adminColumns} data={dummyAdminData as DataItem[]} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDataUser;

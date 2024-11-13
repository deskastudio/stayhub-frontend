import React, { useState } from 'react';
import ProfileInfo from '../components/Elements/ProfileInfo';
import TabPilihan from '../components/Fragments/TabPilihan';
import CustomTable, { DataItem } from "../components/Elements/CustomTable";

// Data Item untuk Data Kamar (No Kamar, Status, Aksi)
interface RoomDataItem {
  noKamar: string;
  status: string;
}

// Data dummy untuk tabel Silver, Gold, and Platinum (disesuaikan dengan data kamar)
const dummySilverData: RoomDataItem[] = [
  { noKamar: "S101", status: "Tersedia" },
  { noKamar: "S102", status: "Tidak Tersedia" },
  { noKamar: "S103", status: "Tersedia" },
];

const dummyGoldData: RoomDataItem[] = [
  { noKamar: "G201", status: "Tersedia" },
  { noKamar: "G202", status: "Tidak Tersedia" },
  { noKamar: "G203", status: "Tersedia" },
];

const dummyPlatinumData: RoomDataItem[] = [
  { noKamar: "P301", status: "Tersedia" },
  { noKamar: "P302", status: "Tidak Tersedia" },
  { noKamar: "P303", status: "Tersedia" },
];

const AdminDataKamar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Silver"); // Menyimpan tab yang aktif

  // Fungsi untuk mengubah tab aktif
  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  // Kolom yang akan ditampilkan untuk Silver, Gold, dan Platinum
  const roomColumns = ["No Kamar", "Status", "Aksi"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Data Kamar</h1>
        <ProfileInfo />
      </div>

      {/* Button Section */}
      <TabPilihan
        buttons={[
          { label: "Silver", variant: "primary" },
          { label: "Gold", variant: "secondary" },
          { label: "Platinum", variant: "secondary" },
        ]}
        activeTab={activeTab} // Pass activeTab ke TabPilihan
        onTabClick={handleTabClick} // Pass handleTabClick untuk mengubah tab aktif
        onAddButtonClick={() => {}}
      />

      {/* Render tabel berdasarkan tab yang aktif */}
      <div className="mt-3">
        {activeTab === "Silver" && (
          <CustomTable columns={roomColumns} data={dummySilverData as DataItem[]} />
        )}
        {activeTab === "Gold" && (
          <CustomTable columns={roomColumns} data={dummyGoldData as unknown as DataItem[]} />
        )}
        {activeTab === "Platinum" && (
          <CustomTable columns={roomColumns} data={dummyPlatinumData as unknown as DataItem[]} />
        )}
      </div>
    </div>
  );
};

export default AdminDataKamar;

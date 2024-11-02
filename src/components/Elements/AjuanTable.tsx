import React, { useState } from "react";
import AjuanResponseModal from "../Fragments/AjuanResponseModal";
import DetailAjuanModal from "../Fragments/DetailAjuanModal"; 

// Mendefinisikan interface untuk item Ajuan
export interface AjuanItem {
  id: number;
  nama: string;
  noKamar: string;
  perihal: string;
  tanggal: string;
  status: string;
  isi: string; // Field ini merepresentasikan 'isiAjuan'
}

// Mendefinisikan props untuk komponen AjuanTable
interface AjuanTableProps {
  data: AjuanItem[];
  onReplyClick: (ajuan: AjuanItem) => void;
}

// Komponen AjuanTable
const AjuanTable: React.FC<AjuanTableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State untuk modal detail
  const [selectedAjuan, setSelectedAjuan] = useState<AjuanItem | null>(null);

  const handleOpenModal = (ajuan: AjuanItem) => {
    setSelectedAjuan(ajuan);
    setIsModalOpen(true);
  };

  const handleOpenDetailModal = (ajuan: AjuanItem) => {
    setSelectedAjuan(ajuan);
    setIsDetailModalOpen(true); // Buka modal detail
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAjuan(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedAjuan(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
        <thead className="bg-primary-dark text-white">
          <tr>
            <th className="p-4 text-center">Nama</th>
            <th className="p-4 text-center">No Kamar</th>
            <th className="p-4 text-center">Perihal</th>
            <th className="p-4 text-center">Tanggal</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center border-b">
              <td className="p-4">{item.nama}</td>
              <td className="p-4">{item.noKamar}</td>
              <td className="p-4">{item.perihal}</td>
              <td className="p-4">{item.tanggal}</td>
              <td className="p-4">
                <div className="flex items-center justify-center h-full">
                  <span className={`w-32 h-8 rounded-lg flex items-center justify-center ${item.status === "Menunggu" ? "bg-red-200" : item.status === "Selesai" ? "bg-green-200" : "bg-gray-200 text-gray-700"}`}>{item.status}</span>
                </div>
              </td>
              <td className="p-4 space-x-2">
                <button
                  onClick={() => handleOpenDetailModal(item)} // Panggil fungsi untuk membuka modal detail
                  className="bg-gray-300 p-2 rounded"
                >
                  Detail
                </button>
                <button
                  onClick={() => {
                    handleOpenModal(item);
                  
                  }}
                  className="bg-primary text-white p-2 rounded"
                >
                  Balas
                </button>
                <button className="bg-red-700 text-white p-2 rounded">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAjuan && <AjuanResponseModal isOpen={isModalOpen} onClose={handleCloseModal} nama={selectedAjuan.nama} noKamar={selectedAjuan.noKamar} isiAjuan={selectedAjuan.isi} />}
      {selectedAjuan && (
        <DetailAjuanModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          ajuan={{
            namaLengkap: selectedAjuan.nama,
            noKamar: selectedAjuan.noKamar,
            tanggal: selectedAjuan.tanggal,
            perihal: selectedAjuan.perihal,
            isiAjuan: selectedAjuan.isi,
          }}
        />
      )}
    </div>
  );
};

export default AjuanTable;

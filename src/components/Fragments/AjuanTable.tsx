import React, { useState } from "react";
import { format } from "date-fns";
import Button from "../Elements/Button";
import DetailModal from "./AjuanDetailModal";
import BalasModal from "./AjuanBalasModal"; 
import HapusAjuanModal from "./HapusAjuanModal"; 

export interface DataItem {
  nama: string;
  noKamar: string;
  perihal: string;
  tanggal: string;
  status: string;
  isiAjuan: string;
}

interface AjuanTableProps {
  ajuanData: DataItem[];
}

const AjuanTable: React.FC<AjuanTableProps> = ({ ajuanData }) => {
  const [selectedAjuan, setSelectedAjuan] = useState<DataItem | null>(null);
  const [isBalasModalOpen, setBalasModalOpen] = useState(false);
  const [selectedForBalas, setSelectedForBalas] = useState<DataItem | null>(null);
  const [isHapusModalOpen, setHapusModalOpen] = useState(false); // State untuk modal hapus
  const [selectedForHapus, setSelectedForHapus] = useState<DataItem | null>(null);

  // Fungsi untuk menangani klik pada tombol detail
  const handleDetailClick = (data: DataItem) => {
    setSelectedAjuan(data);
  };

  // Fungsi untuk menangani klik pada tombol balas
  const handleBalasClick = (data: DataItem) => {
    setSelectedForBalas(data);
    setBalasModalOpen(true);
  };

  // Fungsi untuk menangani klik pada tombol hapus
  const handleHapusClick = (data: DataItem) => {
    setSelectedForHapus(data);
    setHapusModalOpen(true); // Menampilkan modal hapus
  };

  // Fungsi untuk menangani pengiriman tanggapan
  const handleTanggapanSubmit = (tanggapan: string) => {
    console.log("Tanggapan untuk ajuan:", selectedForBalas?.nama);
    console.log("Tanggapan:", tanggapan);
  };

  // Fungsi untuk menangani penghapusan ajuan
  const handleDelete = (noKamar: string) => {
    console.log("Ajuan dengan noKamar:", noKamar, "dihapus");
   
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedAjuan(null);
    setBalasModalOpen(false);
    setHapusModalOpen(false); // Menutup modal hapus
  };

  return (
    <div>
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
            {ajuanData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 text-center">{item.nama}</td>
                <td className="p-4 text-center">{item.noKamar}</td>
                <td className="p-4 text-center">{item.perihal}</td>
                <td className="p-4 text-center">{format(new Date(item.tanggal), "dd/MM/yyyy")}</td>
                <td className="p-4 text-center w-32">
                  <span className={`px-2 py-1 rounded text-center w-full inline-block ${item.status === "Selesai" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{item.status}</span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <Button variant="detail" onClick={() => handleDetailClick(item)}>
                      Detail
                    </Button>
                    <Button variant="primary" onClick={() => handleBalasClick(item)}>
                      Balas
                    </Button>
                    <Button variant="deleted" onClick={() => handleHapusClick(item)}>
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Menampilkan modal detail jika ada ajuan yang dipilih */}
      {selectedAjuan && <DetailModal data={selectedAjuan} onClose={closeModal} />}

      {/* Menampilkan modal balas */}
      {isBalasModalOpen && selectedForBalas && <BalasModal data={selectedForBalas} onClose={closeModal} onSubmit={handleTanggapanSubmit} />}

      {/* Menampilkan modal hapus */}
      {isHapusModalOpen && selectedForHapus && <HapusAjuanModal data={selectedForHapus} onClose={closeModal} onDelete={handleDelete} />}
    </div>
  );
};

export default AjuanTable;

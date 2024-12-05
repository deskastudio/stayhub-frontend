import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Button from "../Elements/Button";
import axios from "axios";
import DetailModal from "./AjuanDetailModal";
import BalasModal from "./AjuanBalasModal";

export interface Ajuan {
  id: number;
  title: string;
  status: "Selesai" | "Menunggu";
  createdAt: string;
  description: string;
  user: { fullName: string};
  room: { name: string };
}

const AjuanTable: React.FC = () => {
  const [ajuanList, setAjuanList] = useState<Ajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAjuan, setSelectedAjuan] = useState<Ajuan | null>(null);
  const [isBalasModalOpen, setBalasModalOpen] = useState(false);
  const [selectedForBalas, setSelectedForBalas] = useState<Ajuan | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(5); // Jumlah item per halaman

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchAjuanList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/complaint", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.data)) {
          setAjuanList(response.data.data);
        } else {
          alert("Data tidak sesuai format.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Gagal memuat data ajuan");
      } finally {
        setLoading(false);
      }
    };

    fetchAjuanList();
  }, [token]);

  const handleDetailClick = (data: Ajuan) => {
    setSelectedAjuan(data);
  };

  const handleBalasClick = (data: Ajuan) => {
    setSelectedForBalas(data);
    setBalasModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAjuan(null);
    setBalasModalOpen(false);
  };

  const formatTanggal = (tanggal: string) => {
    const dateObj = new Date(tanggal);
    if (isNaN(dateObj.getTime())) {
      return "";
    }
    return format(dateObj, "dd/MM/yyyy");
  };

  // Hitung data yang akan ditampilkan berdasarkan halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ajuanList.slice(indexOfFirstItem, indexOfLastItem);

  // Hitung jumlah halaman yang dibutuhkan
  const totalPages = Math.ceil(ajuanList.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : ajuanList.length === 0 ? (
        <p>Belum ada ajuan</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
            <thead className="bg-primary-dark text-white">
              <tr>
                <th className="p-4 text-center">ID Ajuan</th>
                <th className="p-4 text-center">Tanggal</th>
                <th className="p-4 text-center">Perihal</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ajuan) => (
                <tr key={ajuan.id} className="border-b">
                  <td className="p-4 text-center">{ajuan.id}</td>
                  <td className="p-4 text-center">{formatTanggal(ajuan.createdAt)}</td>
                  <td className="p-4 text-center">{ajuan.title}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded ${ajuan.status === "Selesai" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{ajuan.status}</span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <Button variant="detail" onClick={() => handleDetailClick(ajuan)}>
                      Detail
                    </Button>
                    <Button variant="primary" onClick={() => handleBalasClick(ajuan)}>
                      Balas
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Jumlah {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, ajuanList.length)} dari {ajuanList.length}
            </span>
            <div className="flex space-x-2">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 rounded-md text-black bg-gray-300 disabled:opacity-50 ">
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-2 rounded-md text-white ${page === currentPage ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 rounded-md text-black bg-gray-300  disabled:opacity-50">
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAjuan && <DetailModal data={selectedAjuan} onClose={closeModal} />}
      {isBalasModalOpen && selectedForBalas && <BalasModal data={selectedForBalas} onClose={closeModal} />}
    </div>
  );
};

export default AjuanTable;

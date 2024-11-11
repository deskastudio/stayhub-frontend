import React from "react";

interface PesanKosongProps {
  onClick: () => void; // Fungsi untuk membuka form testimoni
}

const PesanKosong: React.FC<PesanKosongProps> = ({ onClick }) => {
  return (
    <div className="mt-4 p-0 text-white rounded-md shadow-xl bg-white w-full pb-4">
      <p className="font-semibold bg-primary-dark w-full m-0 p-6 text-2xl">Belum ada testimoni yang ditulis. Silahkan tulis baru.</p>

      {/* Tombol "Buat Testimoni" */}
      <button
        onClick={onClick} // Menggunakan fungsi onClick yang dikirim dari KontenTestimoni
        className="text-primary font-bold mt-4 inline-block px-4 py-2 w-full text-left"
      >
        Buat testimoni
      </button>
    </div>
  );
};

export default PesanKosong;

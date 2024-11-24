import React from "react";

interface TombolProps {
  label: string;
  onClick?: () => void; // Menambahkan properti onClick agar tombol dapat merespon klik
  disabled?: boolean; // Menambahkan properti disabled untuk menonaktifkan tombol jika diperlukan
  className?: string; // Menambahkan properti className agar gaya tombol bisa disesuaikan dari luar
}

const Tombol: React.FC<TombolProps> = ({ label, onClick, disabled, className }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`px-4 py-2 bg-primary-dark text-white rounded-md ${className} ${disabled ? "cursor-not-allowed bg-gray-400" : ""}`}>
      {label}
    </button>
  );
};

export default Tombol;

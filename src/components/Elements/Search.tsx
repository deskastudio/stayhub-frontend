import  { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import ikon pencarian

interface SearchProps {
  onSearch: (query: string) => void; // Fungsi yang dipanggil ketika melakukan pencarian
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Panggil fungsi onSearch ketika ada perubahan
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input type="text" value={query} onChange={handleSearch} placeholder="Cari ID Bayar atau Status" className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark" />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default Search;

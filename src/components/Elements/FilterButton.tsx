import React, { useState } from 'react';

interface FilterButtonProps {
  options: string[]; // Opsi filter (contoh: ["Semua", "Lunas", "Menunggu"])
  onFilter: (selectedOption: string) => void; // Callback untuk opsi yang dipilih
}

const FilterButton: React.FC<FilterButtonProps> = ({ options, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Semua');

  const handleFilterChange = (option: string) => {
    setSelectedOption(option);
    onFilter(option); // Panggil fungsi filter dari parent
    setIsOpen(false); // Tutup dropdown
  };

  return (
    <div className='relative'>
      <button
        className='bg-white text-primary p-2 rounded-lg flex items-center space-x-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src='/icon/filter-icon.svg'
          alt='Filter Icon'
          className='w-4 h-4'
        />
        <span>{selectedOption}</span>
      </button>
      {isOpen && (
        <ul className='absolute bg-white shadow-lg rounded-lg mt-2 w-40 z-10'>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleFilterChange(option)}
              className='p-2 hover:bg-primary hover:text-white cursor-pointer rounded'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterButton;

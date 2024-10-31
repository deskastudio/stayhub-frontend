import React from "react";

const FilterButton: React.FC = () => (
  <button className="bg-white text-primary p-2 rounded-lg flex items-center space-x-2">
    <img src="/icon/filter-icon.svg" alt="Filter Icon" className="w-4 h-4" /> 
    <span>Filter</span>
  </button>
);

export default FilterButton;

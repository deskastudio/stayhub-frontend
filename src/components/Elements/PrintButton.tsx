import React from "react";

const PrintButton: React.FC = () => (
  <button className="bg-primary text-white py-2 px-6 rounded-lg flex items-center space-x-3 hover:bg-primary-dark">
    {" "}
    {/* Menambah padding */}
    <img src="/icon/print-icon.svg" alt="Print Icon" className="w-6 h-6" />
    <span className="font-bold">Print</span>
  </button>
);

export default PrintButton;

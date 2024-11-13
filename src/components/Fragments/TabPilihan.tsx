import React from "react";
import Button from "../Elements/Button";

interface ButtonItem {
  label: string;
  variant: "primary" | "secondary" | "add" | "deleted";
}

// Definisikan props untuk TabPilihan
interface TabPilihanProps {
  buttons: ButtonItem[];
  activeTab: string;
  onTabClick: (label: string) => void;
  onAddButtonClick: () => void;
}

const TabPilihan: React.FC<TabPilihanProps> = ({ buttons, activeTab, onTabClick, onAddButtonClick }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      {/* Menampilkan tombol dinamis */}
      <div className="flex justify-start items-center mb-8 gap-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={activeTab === button.label ? "primary" : "secondary"}
            onClick={() => onTabClick(button.label)}
          >
            {button.label}
          </Button>
        ))}
      </div>
      {/* Tombol "Tambah Kamar" */}
      <div className="flex justify-end items-center mb-8">
        <Button variant="add" onClick={onAddButtonClick}>
          Tambah Kamar
        </Button>
      </div>
    </div>
  );
};

export default TabPilihan;

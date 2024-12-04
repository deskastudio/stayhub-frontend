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
  onAddButtonClick?: () => void;
  addButtonLabel?: string; // Label untuk tombol tambah
}

const TabPilihan: React.FC<TabPilihanProps> = ({
  buttons,
  activeTab,
  onTabClick,
  onAddButtonClick,
  addButtonLabel = "Tambah", // Default label adalah "Tambah"
}) => {
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
      {/* Tombol "Tambah" */}
      {onAddButtonClick && (
        <div className="flex justify-end items-center mb-8">
          <Button variant="add" onClick={onAddButtonClick}>
            {addButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TabPilihan;
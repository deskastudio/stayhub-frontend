import React from 'react';
import Button from '../Elements/Button';

interface ButtonItem {
  label: string;
  value: string; // Unique identifier for each tab
  variant: 'primary' | 'secondary' | 'add' | 'deleted';
}

// Define props for TabPilihan
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
  addButtonLabel = 'Tambah', // Default label is "Tambah"
}) => {
  console.log('TabPilihan Buttons:', buttons);
  console.log('TabPilihan Active Tab:', activeTab);

  return (
    <div className='flex justify-between items-center gap-4'>
      {/* Dynamic Tabs */}
      <div className='flex justify-start items-center mb-8 gap-4'>
        {buttons.map((button) => (
          <Button
            key={button.value} // Use 'value' as key for uniqueness
            variant={activeTab === button.value ? 'primary' : 'secondary'}
            onClick={() => onTabClick(button.value)} // Pass 'value' on click
          >
            {button.label}
          </Button>
        ))}
      </div>
      {/* Tombol "Tambah" */}
      {onAddButtonClick && (
        <div className='flex justify-end items-center mb-8'>
          <Button variant='add' onClick={onAddButtonClick}>
            {addButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TabPilihan;

import Button from '../Elements/Button';

// Define props for TabPilihan
interface TabPilihanProps {
  onAddButtonClick?: () => void;
  addButtonLabel?: string; // Label untuk tombol tambah
}

const TabPilihan: React.FC<TabPilihanProps> = ({
  onAddButtonClick,
  addButtonLabel = 'Tambah', // Default label is "Tambah"
}) => {
  return (
    <div className='flex justify-between items-center gap-4'>
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

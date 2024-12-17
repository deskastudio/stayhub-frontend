import Button from '../Elements/Button';

interface PlaceholderProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAdd: () => void;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  title = 'Belum ada data',
  description = 'Silakan tambahkan data baru.',
  buttonText = 'Tambah Data',
  onAdd,
}) => {
  return (
    <div className='text-start'>
      <Button variant='add' onClick={onAdd}>
        {buttonText}
      </Button>
      <div className='bg-white rounded shadow my-10'>
        <p className='bg-primary-dark font-bold text-xl text-white px-4 py-10'>
          {title}
        </p>
        <p
          onClick={(e) => {
            e.preventDefault();
            onAdd();
          }}
          className='text-primary-dark font-bold text-left px-4 py-4 rounded transition cursor-pointer'
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Placeholder;

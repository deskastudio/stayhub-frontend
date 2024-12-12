
import Button from '../Elements/Button';
import { TestimonialItemProps } from '../Elements/TestimonialData';

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
  onEdit,
  onDelete,
}) => {
  const { id, roomType, roomNumber, comment, rating } = testimonial;

  return (
    <div className='border rounded shadow-2xl max-w-full'>
      <table className='w-full border'>
        <tbody>
          <tr className='border-b border-gray-300'>
            <th className='font-bold py-2 px-3 align-top text-left'>
              Tipe Kamar
            </th>
            <td className='pl-2 py-1 text-left'>{roomType}</td>
          </tr>
          <tr className='border-b border-gray-300 bg-gray-200'>
            <th className='font-bold py-2 px-3 align-top text-left'>
              Nomor Kamar
            </th>
            <td className='pl-2 py-1 text-left'>{roomNumber}</td>
          </tr>
          <tr className='border-b border-gray-300'>
            <th className='font-bold py-2 px-3 align-top text-left'>Ulasan</th>
            <td className='pl-2 py-1 text-left'>{comment}</td>
          </tr>
          <tr className='bg-gray-200'>
            <th className='font-bold py-2 px-3 align-top text-left'>Rating</th>
            <td className='pl-2 py-1 text-left text-3xl text-yellow-500'>
              {'★'.repeat(rating)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className='flex justify-center space-x-2 mt-4 mb-4'>
        <Button variant='deleted' onClick={() => onDelete(id)}>
          Hapus
        </Button>
        <Button variant='detail' onClick={() => onEdit()}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TestimonialItem;

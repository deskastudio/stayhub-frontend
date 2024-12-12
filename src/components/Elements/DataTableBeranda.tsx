
import { useFetchRoom } from '../../hooks/useFetchRoom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type Room = {
  name: string;
  updatedAt: string;
  type: {
    cost: number;
  }[];
  transaction: {
    status: string;
  }[];
};

const DataTable: React.FC = () => {
  const { room } = useFetchRoom();

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full'>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-gray-500 text-sm border-b'>
            <th className='py-2'>No</th>
            <th className='py-2'>Tanggal</th>
            <th className='py-2'>Nomor Kamar</th>
            <th className='py-2'>Harga</th>
            <th className='py-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {room?.map((room: Room, index: number) => (
            <tr className='text-gray-700'>
              <td className='py-2'>{index + 1}</td>
              <td className='py-2'>
                {room?.updatedAt &&
                  format(new Date(room.updatedAt), 'dd MMMM yyyy', {
                    locale: id,
                  })}
              </td>
              <td className='py-2'>{room.name}</td>
              <td className='py-2'>
                Rp. {room.type[0].cost.toLocaleString('id-ID') || '0'}
              </td>
              <td className='py-2'>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    room?.transaction[0]?.status
                      ? room?.transaction[0]?.status === 'settlement'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {room?.transaction[0]?.status
                    ? room?.transaction[0]?.status === 'settlement'
                      ? 'Lunas'
                      : 'Belum Bayar'
                    : 'Ga Laku'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

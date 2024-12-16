import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '../components/Elements/Button';
import ProfileUser from '../components/Fragments/Profile';
import { format, add } from 'date-fns';
import { id } from 'date-fns/locale';
import { getUserName, getRoomId } from '../utils/auth.utils';
import { IRoom } from '../interfaces/models/RoomInterface';
import { IRoomType } from '../interfaces/models/RoomTypeInterface';

const UserBeranda: React.FC = () => {
  // const [setIsModalOpen] = useState(false);
  const [room, setRoom] = useState<Partial<IRoom>>();
  const [type, setType] = useState<Partial<IRoomType>>();

  // const openModal = () => setIsModalOpen(true);

  // NEW get token and idUser
  const userName = getUserName();
  const token = sessionStorage.getItem('token');
  const roomId = getRoomId();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // Fetch data room
        const response = await axios.get(
          `http://localhost:8000/room/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set data room
        const roomData = response.data.data;
        if (roomData) {
          const room = roomData;
          const type = room.type[0];

          setRoom({
            name: room.name,
            updatedAt: room.updatedAt,
          });

          setType({
            name: type.name,
            cost: type.cost,
          });
        }
      } catch (error) {
        if (error) {
          // Alert error
          setTimeout(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Anda belum menyelesaikan pembayaran',
              showConfirmButton: false,
              timer: 2000,
            });
          }, 1000);
        }
      }
    };

    fetchRoom();
  }, [token, roomId]);

  return (
    <div className='p-8 flex-grow'>
      <div className='flex justify-between items-start mb-6'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-2xl font-bold'>Halo {userName} 👋</h1>
          <p>Yuk cek tagihan kamar kosmu sekarang juga</p>
        </div>
        <ProfileUser />
      </div>
      <div className='mb-10'>
        <Button variant='primary'>Lakukan pembayaran</Button>
      </div>
      <div className='overflow-x-auto w-full'>
        <div className='flex space-x-4'>
          <div className='bg-white p-4 rounded-lg flex-1 space-y-5'>
            <p className='font-semibold'>Tagihan bulan ini</p>
            <span>
              {room?.updatedAt &&
                format(new Date(room.updatedAt), ' MMMM yyyy', {
                  locale: id,
                })}
            </span>
            <div className='flex gap-5 items-center'>
              <p className='text-xl font-bold'>Belum Lunas</p>
              <img src='icon/cross-red.svg' alt='' />
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg flex-1 space-y-5'>
            <p className='font-semibold'>
              Kamu belum membayar tagihan bulan ini
            </p>
            <div className='flex gap-5 items-center'>
              <p className='text-xl font-bold'>
                Rp.{' '}
                {(type?.cost &&
                  new Intl.NumberFormat('id-ID').format(type.cost)) ||
                  0}
              </p>
              <img src='icon/money.svg' alt='' />
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg mt-6'>
          <p className='font-semibold text-lg'>Detail Penyewaan</p>
          <table className='mt-4 text-left'>
            <tbody>
              <tr>
                <th className='px-4 py-2 text-gray-700'>Nomor Kamar</th>
                <th>:</th>
                <td className='px-4 py-2'>{room?.name}</td>
              </tr>
              <tr>
                <th className='px-4 py-2 text-gray-700'>Tipe Kamar</th>
                <th>:</th>
                <td className='px-4 py-2'>{type?.name}</td>
              </tr>
              <tr>
                <th className='px-4 py-2 text-gray-700'>Tarif Kamar</th>
                <th>:</th>
                <td className='px-4 py-2'>
                  Rp.{' '}
                  {(type?.cost &&
                    new Intl.NumberFormat('id-ID').format(type.cost)) ||
                    0}
                </td>
              </tr>
              <tr>
                <th className='px-4 py-2 text-gray-700'>Tanggal Sewa</th>
                <th>:</th>
                <td className='px-4 py-2'>
                  {room?.updatedAt &&
                    format(new Date(room.updatedAt), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                </td>
              </tr>
              <tr>
                <th className='px-4 py-2 text-gray-700'>Tanggal Akhir Sewa</th>
                <th>:</th>
                <td className='px-4 py-2'>
                  {room?.updatedAt &&
                    format(
                      add(new Date(room.updatedAt), { months: 1 }),
                      'dd MMMM yyyy',
                      { locale: id }
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserBeranda;

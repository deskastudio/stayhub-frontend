import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import {
  FaCalculator,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaRegCircle,
} from 'react-icons/fa';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { IoBedOutline } from 'react-icons/io5';
import { MdOutlineKitchen } from 'react-icons/md';
import { LiaBathSolid } from 'react-icons/lia';
import { FaWifi } from 'react-icons/fa6';
import { TbAirConditioning } from 'react-icons/tb';

// Interfaces
interface Facility {
  name: string;
}
interface Images {
  url: string;
}
interface Room {
  id: string;
  name: string[];
  images: Images[];
  status: string;
}
interface RoomType {
  id: string;
  name: string;
  facility: Facility[];
  description: string;
  cost: number;
}

const Room: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<Room | null>(null);
  const [currentType, setCurrentType] = useState<RoomType | null>(null);
  const [currentImage, setCurrentImage] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
  const [availableRooms, setAvailableRooms] = useState<
    { id: string; name: string }[]
  >([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getFacilityIcon = (facilityName: string) => {
    switch (facilityName.toLowerCase()) {
      case '1 kasur':
      case '1 bed':
        return <IoBedOutline />;
      case 'dapur bersama':
      case 'kitchen':
        return <MdOutlineKitchen />;
      case 'kamar mandi':
      case 'bathroom':
        return <LiaBathSolid />;
      case 'wifi':
      case 'wifi cepat':
        return <FaWifi />;
      case 'air conditioning':
      case 'ac tersedia':
        return <TbAirConditioning />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);

        // Fetch data room by type
        const response = await axios.get(
          `http://localhost:8000/room/type/${id}`
        );

        // Collect first data
        const roomList = response.data.data;
        if (roomList.length > 0) {
          const room = roomList[0];
          const type = room.type[0];

          // Set data room
          setRoom({
            id: room.id,
            name: room.name,
            images: room.images || [],
            status: room.status,
          });

          // Set data type room
          setCurrentType({
            id: type._id,
            name: type.name,
            facility: type.facility || [],
            description: type.description,
            cost: type.cost,
          });

          // Set first image
          const images = roomList.map((room: Room) => room.images[0]?.url);
          setCurrentImage(images);
        }

        // Set available rooms
        setAvailableRooms(
          roomList.map((room: Room) => ({ id: room.id, name: room.name }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Show data if id is defined
    if (id) {
      fetchRoom();
    }
  }, [id]);

  /* Booking Room */
  const handleBooking = async () => {
    if (!selectedRoomNumber) {
      // Alert to select room
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Anda belum memilih kamar',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    // const userId = getUserId();
    const roomId = selectedRoomNumber;
    try {
      const response = await axios.post(
        `http://localhost:8000/transaction/callback/${roomId}`,
        // { userId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      alert('Pemesanan berhasil!');
      console.log('Response:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

        // Alert unauthorized
        if (status === 401) {
          // Save room id to local storage
          localStorage.setItem(
            '_pendingBooking',
            JSON.stringify({
              roomId,
            })
          );

          // Alert to login
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Anda belum login',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate('/login');
          });
        }
      }
    }
  };

  if (loading) {
    return (
      <div className='container py-20'>
        <h1 className='text-5xl font-bold font-main text-center text-primary mb-12'>
          Loading...
        </h1>
      </div>
    );
  }

  // Images selector
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentImage.length - 1 : prevIndex - 1
    );
  };

  // Images selector
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Images selector
  const selectImage = () => {
    setCurrentIndex((index) => index);
  };

  return (
    <>
      <Navbar />
      <div className='container py-20'>
        <div className='flex items-center gap-4 mb-16'>
          <Link
            to='/'
            className='flex items-center justify-center w-12 h-12 bg-default rounded-full shadow-md'
          >
            <i className='text-secondary text-3xl'>
              <GoArrowLeft />
            </i>
          </Link>
          <p className='font-medium text-lg'>
            Home / <span className='font-normal'>{currentType?.name}</span>
          </p>
        </div>
        <h1 className='text-5xl font-main font-bold text-primary mb-6'>
          {currentType?.name}
        </h1>
        <p className='text-gray-500 mb-6 font-medium text-lg'>
          Dago Giri, Kabupaten Bandung
        </p>
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <div className='w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between mt-8 md:mt-0 items-center'>
            <h1 className='font-medium text-lg pb-6'>{room?.name}</h1>
            {/* Gambar Thumbnail */}
            {currentImage.length > 0 && (
              <div className='relative w-full h-80 flex items-center justify-center'>
                <button
                  onClick={handlePrevious}
                  className='absolute left-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none'
                >
                  <FaChevronLeft size={20} />
                </button>
                <img
                  src={`http://localhost:8000/${currentImage[currentIndex]}`}
                  alt={`images${currentIndex + 1}`}
                  className='w-3/4 h-full rounded-lg object-cover'
                />
                <button
                  onClick={handleNext}
                  className='absolute right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none'
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Indikator Bulan */}
            {currentImage.length > 0 && (
              <div className='flex justify-center gap-2 mt-4'>
                {currentImage.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage()}
                    className='focus:outline-none'
                  >
                    {index === currentIndex ? (
                      <FaCircle size={12} />
                    ) : (
                      <FaRegCircle size={12} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className='w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between mt-8 md:mt-0'>
            <div className='space-y-8'>
              <div className='space-y-3'>
                <h2 className='font-medium text-2xl'>Pesan Sekarang</h2>
                <h2 className='font-bold text-2xl text-primary'>
                  Rp. {currentType?.cost?.toLocaleString('id-ID') || '0'} /
                  Bulan
                </h2>
              </div>
              <div className='space-y-4'>
                <label className='block mb-3 font-medium text-lg'>
                  Pilih Nomor Kamar
                </label>
                <div className='relative'>
                  <select
                    className='w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-300'
                    value={selectedRoomNumber}
                    onChange={(e) => setSelectedRoomNumber(e.target.value)}
                  >
                    {/* Default */}
                    <option
                      className='text-yellow-300'
                      value=''
                      disabled
                      hidden
                    >
                      Pilih kamar kamu
                    </option>

                    {/* Room exist */}
                    {availableRooms.length > 0 ? (
                      availableRooms.map((room, index) => (
                        <option key={index} value={room.id}>
                          {room.name}
                        </option>
                      ))
                    ) : (
                      <option>Tidak ada kamar tersedia</option>
                    )}
                  </select>
                  <span className='absolute top-1/4 right-4 flex items-center pointer-events-none'>
                    ▼
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={handleBooking}
                  className='bg-primary text-white w-full py-3 rounded-lg font-bold'
                >
                  Pesan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className='py-16'>
          <h2 className='text-4xl font-bold text-primary mb-4'>Deskripsi</h2>
          <p className='mb-4 text-lg'>
            {currentType?.description || 'Deskripsi tidak tersedia.'}
          </p>
          <div className='flex items-center mt-8 justify-between'>
            <div className='flex items-center gap-5'>
              <i className='text-4xl text-primary'>
                <FaCalculator />
              </i>
              <span className='font-main text-xl text-secondary max-w-[270px]'>
                Ingin melihat hunian secara langsung?
              </span>
            </div>
            <button className='bg-primary text-default py-3 px-4 rounded-2xl flex items-center gap-2'>
              <i className='text-3xl'>
                <IoChatbubbleEllipses />
              </i>
              <p className='font-bold font-main'>Jadwalkan kunjungan</p>
            </button>
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='text-4xl font-bold text-primary mb-8'>Fasilitas</h2>
          <div className='flex flex-wrap gap-4 justify-start'>
            {currentType?.facility?.length ? (
              currentType.facility.map((facility, index) => (
                <div
                  key={index}
                  className='flex items-center bg-blue-100 px-5 py-2 rounded-xl'
                >
                  <i className='text-primary text-3xl mr-2'>
                    {getFacilityIcon(facility.name)}
                  </i>
                  <span className='text-primary font-main'>
                    {facility.name}
                  </span>
                </div>
              ))
            ) : (
              <p className='text-center'>Fasilitas tidak tersedia.</p>
            )}
          </div>
        </div>
        <div className='py-16'>
          <h2 className='text-4xl font-bold text-primary mb-8'>Alamat</h2>
          <div className='w-full h-96 overflow-hidden rounded-lg shadow-lg'>
            <iframe
              src='https://www.google.com/maps/embed?... '
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
              title='Google Maps Location'
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Room;

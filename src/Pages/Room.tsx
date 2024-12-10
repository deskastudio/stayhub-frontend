import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import RoomImages from '../components/Rooms/RoomImages';
import Adress from '../components/Rooms/Adress';
import BookingForm from '../components/Rooms/BookingForm';
import Facilities from '../components/Rooms/Facilities';
import { useFetchRoomByType } from '../hooks/useFetchRoomByType';
import { GoArrowLeft } from 'react-icons/go';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaCalculator } from 'react-icons/fa';

const Room: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
  const { id } = useParams<{ id: string }>();
  const { room, currentType, availableRooms, currentImage, loading } =
    useFetchRoomByType(id || '');
  const navigate = useNavigate();

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

    const roomId = selectedRoomNumber;
    try {
      const response = await axios.post(
        `http://localhost:8000/transaction/callback/${roomId}`,
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

  /* Images selector */
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentImage.length - 1 : prevIndex - 1
    );
  };

  /* Images selector */
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  /* Images selector */
  const selectImage = () => {
    setCurrentIndex((index) => index);
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

            <RoomImages
              images={currentImage}
              currentIndex={currentIndex}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSelect={selectImage}
            />
          </div>

          <BookingForm
            cost={currentType?.cost}
            availableRooms={availableRooms}
            selectedRoomNumber={selectedRoomNumber}
            onRoomSelect={setSelectedRoomNumber}
            onBooking={handleBooking}
          />
        </div>

        {/* Description */}
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

        <Facilities facilities={currentType?.facility || []} />
        <Adress />
      </div>
      <Footer />
    </>
  );
};

export default Room;

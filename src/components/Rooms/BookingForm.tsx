import React from 'react';

interface BookingFormProps {
  cost: number | undefined;
  availableRooms: { id: string; name: string }[];
  selectedRoomNumber: string;
  onRoomSelect: (roomId: string) => void;
  onBooking: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  cost,
  availableRooms,
  selectedRoomNumber,
  onRoomSelect,
  onBooking,
}) => {
  return (
    <div className='w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between mt-8 md:mt-0'>
      <div className='space-y-8'>
        <div className='space-y-3'>
          <h2 className='font-medium text-2xl'>Pesan Sekarang</h2>
          <h2 className='font-bold text-2xl text-primary'>
            Rp. {cost?.toLocaleString('id-ID') || '0'} / Bulan
          </h2>
        </div>
        <div className='space-y-4'>
          <label className='block mb-3 font-medium text-lg'>
            Pilih Nomor Kamar
          </label>
          <select
            className='w-full p-3 border rounded-lg'
            value={selectedRoomNumber}
            onChange={(e) => onRoomSelect(e.target.value)}
          >
            <option value='' disabled hidden>
              Pilih kamar kamu
            </option>
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
        </div>
        <button
          onClick={onBooking}
          className='bg-primary text-white w-full py-3 rounded-lg font-bold'
        >
          Pesan
        </button>
      </div>
    </div>
  );
};

export default BookingForm;

// RoomCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface RoomCardProps {
  image: string;
  type: string;
  remaining: string;
  destination: string;
  features: { icon: React.ReactNode; text: string }[];
  price: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  type,
  remaining,
  destination,
  features,
  price,
}) => {
  return (
    <div className='bg-default rounded-lg shadow-md overflow-hidden'>
      <img
        src={image}
        alt={`Image of ${type}`}
        className='w-full h-80 object-cover'
      />
      <div className='py-5 px-7 border border-black rounded-b-lg'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-xl font-bold font-main'>{type}</h2>
          <span className='text-gray-500'>Sisa {remaining} kamar</span>
        </div>
        <div className='flex justify-between text-gray-700 mb-8 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center w-48 text-center'
            >
              <i className='text-xl text-secondary'>{feature.icon}</i>
              <span className='font-medium'>{feature.text}</span>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-gray-500 mb-2'>Mulai dari</p>
            <div className='text-lg font-bold font-main text-primary mb-4'>
              {price}
            </div>
          </div>
          <div>
            <Link to={destination}>
              <button className='py-2.5 px-2.5 border font-main font-bold text-sm border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition duration-300'>
                Lihat Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Interfaces
interface Facility {
  name: string;
}

interface RoomType {
  id: string;
  name: string;
  facility: Facility[];
  description: string;
  cost: string;
}

interface CardType {
  id: string;
  image: string;
  type: string;
  description: string;
  price: string;
}

// TypeCard Component
const TypeCard: React.FC<CardType> = ({
  id,
  image,
  type,
  description,
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
        <div className='flex flex-col justify-between items-start mb-8'>
          <h2 className='text-xl font-bold font-main'>{type}</h2>
          <span className='text-gray-500'>{description}</span>
        </div>
        <div className='flex flex-col items-center justify-between'>
          <div className='flex'>
            <div className='text-lg font-bold font-main text-primary mb-4'>
              {price}
            </div>
          </div>
          <div>
            <Link to={`/room/type/${id}`}>
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

// Component
const RoomType: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<RoomType[]>([]);

  useEffect(() => {
    const fetchTypeRoom = async () => {
      try {
        setLoading(true);

        const response = await axios.get('http://localhost:8000/type');

        // Map data from API
        const data = response.data.data.map((type: RoomType) => ({
          id: type.id,
          name: type.name,
          facility: type.facility,
          description: type.description,
          cost: type.cost,
        }));

        setType(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypeRoom();
  }, []);

  // Component
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id='booking' className='container pb-24'>
      <h1 className='text-5xl font-bold font-main text-center text-primary mb-12'>
        Pilih Tipe Kamar
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {type.map((type) => (
          <TypeCard
            key={type.id}
            id={type.id}
            image='/silver.png'
            type={type.name}
            description={type.description}
            price={`Rp. ${type.cost.toLocaleString()} / Bulan`}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomType;

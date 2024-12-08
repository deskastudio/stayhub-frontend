import React from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaRegCircle,
} from 'react-icons/fa';

// Interface
interface RoomImagesProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

const RoomImages: React.FC<RoomImagesProps> = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
  onSelect,
}) => {
  return (
    <div className='relative w-full h-80 flex flex-col items-center justify-center'>
      {/* Button previous */}
      <button
        onClick={onPrevious}
        className='absolute left-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200'
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Images */}
      <img
        src={`http://localhost:8000/${images[currentIndex]}`}
        alt={`images${currentIndex + 1}`}
        className='w-3/4 h-full rounded-lg object-cover'
      />

      {/* Button next */}
      <button
        onClick={onNext}
        className='absolute right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200'
      >
        <FaChevronRight size={20} />
      </button>

      {/* Indicator */}
      <div className='flex justify-center gap-2 mt-4'>
        {images.map((_, index) => (
          <button key={index} onClick={() => onSelect(index)}>
            {index === currentIndex ? (
              <FaCircle size={12} />
            ) : (
              <FaRegCircle size={12} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomImages;

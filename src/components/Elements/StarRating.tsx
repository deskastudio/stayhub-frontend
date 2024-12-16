import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      i < rating ? (
        <IoMdStar key={i} className='text-yellow-500' />
      ) : (
        <IoMdStarOutline key={i} className='text-yellow-500' />
      )
    );
  }
  return <div className='flex'>{stars}</div>;
};

export default StarRating;

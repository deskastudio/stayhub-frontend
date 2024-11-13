// components/elements/Rating.tsx
import React from "react";

interface RatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, onRate }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => onRate(star)} className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-500" : "text-yellow-100"}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;

import React, { useState } from "react";
import Rating from "../Elements/Rating";
import Button from "../Elements/Button";

interface RatingFormModalProps {
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const RatingFormModal: React.FC<RatingFormModalProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = () => {
    if (rating === 0) {
      alert("Silakan beri rating terlebih dahulu!");
      return;
    }
    onSubmit(rating); // Kirim rating yang dipilih
    onClose(); // Menutup modal setelah rating terkirim
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative -mt-40">
        <button className="absolute top-2 right-2  font-bold ext-gray-500 hover:text-gray-800 text-3xl mr-2" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-lg font-bold text-center mb-4">Rating StayHub</h2>
        <p className="text-center mb-4">Berikan penilaianmu terhadap kos ini</p>
        <div className="flex justify-center mb-4">
          <Rating rating={rating} onRate={setRating} /> {/* Pilih rating */}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <Button variant="add" onClick={handleRatingSubmit}>
            Kirim
          </Button>
          <Button variant="detail" onClick={onClose}>
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingFormModal;

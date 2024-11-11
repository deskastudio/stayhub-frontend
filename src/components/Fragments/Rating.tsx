import React, { useCallback } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number | null;
  setRating: (rating: number | null) => void; // Perubahan supaya rating bisa di-set null
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, setRating, onCancel, onSubmit }) => {
  // Optimalkan fungsi dengan useCallback
  const handleStarClick = useCallback(
    (star: number) => {
      setRating(star); // Update rating langsung
    },
    [setRating]
  );

  // Fungsi pembatalan rating
  const handleCancelClick = useCallback(() => {
    setRating(null); // Membatalkan rating dengan set null
    onCancel(); // Fungsi onCancel yang diteruskan dari props
  }, [setRating, onCancel]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-white bg-opacity-10"></div>

      {/* Form Rating */}
      <div className="relative w-full max-w-lg min-w-[300px] mx-auto bg-white p-6 rounded-md shadow-lg z-10" style={{ top: "15%" }}>
        {/* Judul "Rating StayHub" */}
        <h2 className="text-xl text-left text-gray-800 mb-4 font-bold">Rating StayHub</h2>

        {/* Tombol Silang (Tutup) */}
        <div className="absolute top-2 right-4">
          <button onClick={handleCancelClick} className="text-3xl ml-2" aria-label="Tutup">
            x
          </button>
        </div>

        {/* Deskripsi Rating */}
        <p className="text-lg font-medium text-gray-700 mt-4 text-left">Berikan penilaianmu terhadap fasilitas kos ini:</p>

        {/* Rating Bintang */}
        <div className="flex justify-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)} // Handle klik bintang
              className={`text-2xl ${rating && rating >= star ? "text-yellow-500" : "text-yellow-500"}`}
            >
              {rating && rating >= star ? <FaStar /> : <FaRegStar />} {/* Gunakan FaStar jika sudah dipilih, FaRegStar jika belum */}
            </button>
          ))}
        </div>

        {/* Tombol Kirim */}
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={(e) => onSubmit(e)} className="px-6 py-2 bg-primary text-white rounded-md ">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rating;

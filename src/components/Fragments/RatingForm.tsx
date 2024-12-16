import React, { useState } from 'react';
import Rating from '../Elements/Rating';
import Button from '../Elements/Button';

interface RatingFormModalProps {
  onClose: () => void;
  onSubmit: (rating: number) => Promise<void> | void; // Mendukung operasi async
}

const RatingFormModal: React.FC<RatingFormModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State untuk mencegah klik ganda
  const [error, setError] = useState<string>(''); // State untuk error

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      setError('Silakan beri rating terlebih dahulu!');
      return;
    }

    try {
      setError(''); // Reset error
      setIsSubmitting(true); // Mulai proses
      await onSubmit(rating); // Tunggu proses pengiriman selesai
      onClose(); // Tutup modal setelah selesai
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError('Gagal mengirim rating. Silakan coba lagi.'); // Set error jika ada
    } finally {
      setIsSubmitting(false); // Pastikan state direset
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg relative -mt-40'>
        <button
          className='absolute top-2 right-2 font-bold text-gray-500 hover:text-gray-800 text-3xl mr-2'
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className='text-lg font-bold text-center mb-4'>Rating StayHub</h2>
        <p className='text-center mb-4'>Berikan penilaianmu terhadap kos ini</p>
        <div className='flex justify-center mb-4'>
          <Rating rating={rating} onRate={setRating} />
        </div>
        {error && <p className='text-red-500 mb-4'>{error}</p>}{' '}
        {/* Tampilkan error jika ada */}
        <div className='flex justify-center mt-4 space-x-2'>
          <Button
            variant='add'
            onClick={handleRatingSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </Button>
          <Button variant='detail' onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingFormModal;

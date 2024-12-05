import React, { useState, useEffect } from 'react';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import RatingFormModal from './RatingForm';
import { TestimonialData } from '../Elements/TestimonialData';

interface TestimonialFormProps {
  initialData?: TestimonialData | undefined | null;
  onSubmit: (data: TestimonialData) => void;
  onCancel: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [data, setData] = useState<TestimonialData>({
    id: '',
    fullName: '',
    roomType: '',
    roomNumber: '',
    comment: '',
    rating: 0,
  });

  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [formError, setFormError] = useState<string>('');

  // Setel data awal saat komponen pertama kali di-mount
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form: semua kolom harus diisi
    if (!data.fullName || !data.roomType || !data.roomNumber || !data.comment) {
      setFormError('Semua kolom wajib diisi!');
      return;
    }

    setFormError(''); // Reset error message
    setRatingModalOpen(true); // Menampilkan modal rating setelah form di-submit
  };

  const handleRatingSubmit = (rating: number) => {
    if (rating === 0) {
      // Jika rating belum dipilih, tampilkan pesan error
      alert('Silakan beri rating terlebih dahulu!');
      return;
    }

    // Kirim data form lengkap termasuk rating
    onSubmit({ ...data, rating });
    setRatingModalOpen(false); // Menutup modal setelah rating terkirim
  };

  const getRoomNumberOptions = (roomType: string) => {
    switch (roomType) {
      case 'Silver':
        return Array.from({ length: 10 }, (_, index) =>
          (101 + index).toString()
        );
      case 'Gold':
        return Array.from({ length: 10 }, (_, index) =>
          (201 + index).toString()
        );
      case 'Platinum':
        return Array.from({ length: 10 }, (_, index) =>
          (301 + index).toString()
        );
      default:
        return [];
    }
  };

  return (
    <form
      className='space-y-6 p-6 border rounded-lg shadow-xl bg-white'
      onSubmit={handleFormSubmit}
    >
      {formError && <div className='text-red-500'>{formError}</div>}

      <div className='flex flex-col'>
        <Input
          label='Nama Lengkap'
          name='fullName'
          value={data.fullName}
          onChange={handleChange}
          placeholder='Nama Lengkap'
        />
        <Input
          label='Type Kamar'
          name='roomType'
          type='select'
          value={data.roomType}
          onChange={handleChange}
          options={['Silver', 'Gold', 'Platinum']}
        />
        <Input
          label='No Kamar'
          name='roomNumber'
          type='select'
          value={data.roomNumber}
          onChange={handleChange}
          options={getRoomNumberOptions(data.roomType)}
        />
        <Input
          label='Ulasan'
          name='comment'
          type='textarea'
          value={data.comment}
          onChange={handleChange}
          placeholder='Tulis ulasan Anda'
        />
      </div>

      <div className='flex justify-center space-x-4 mt-6'>
        <Button variant='add' type='submit'>
          Kirim
        </Button>
        <Button variant='detail' onClick={onCancel}>
          Batal
        </Button>
      </div>

      {isRatingModalOpen && (
        <RatingFormModal
          onClose={() => setRatingModalOpen(false)} // Menutup modal jika batal
          onSubmit={handleRatingSubmit} // Kirim rating ke testimonial
        />
      )}
    </form>
  );
};

export default TestimonialForm;

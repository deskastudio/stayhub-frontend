import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Rating from '../Elements/Rating';
import { TestimonialData } from '../Elements/TestimonialData';
import { getRoomId } from '../../utils/auth.utils';

interface TestimonialFormProps {
  userId: string;
  roomId: string;
  onSubmit: (data: TestimonialData) => void;
  onCancel: () => void;
  editingTestimonial: TestimonialData | null;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const token = sessionStorage.getItem('token');
  const roomId = getRoomId();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Cek apakah form telah terisi dengan baik
    if (!comment || rating === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Anda belum mengisi form',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/review/${roomId}`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Handle success notification
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Terima kasih atas testimoni Anda.',
          showConfirmButton: false,
          timer: 2000,
        });

        onSubmit(response.data);

        // Reset form setelah submit sukses
        setComment('');
        setRating(0); // Reset rating setelah sukses submit
        setFormError(''); // Reset error message

        // Refresh halaman setelah delay
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi kesalahan saat mengirim testimoni.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          label='Ulasan'
          name='comment'
          type='textarea'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Tulis ulasan Anda'
        />
        <Rating rating={rating} onRate={setRating} />
      </div>

      <div className='flex justify-end space-x-2 mt-6'>
        <Button variant='deleted' onClick={onCancel}>
          Batal
        </Button>
        <Button variant='add' type='submit' disabled={loading}>
          {loading ? 'Mengirim...' : 'Kirim'}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;

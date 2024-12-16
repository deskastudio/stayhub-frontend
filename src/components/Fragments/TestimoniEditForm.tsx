import axios from 'axios';
import Swal from 'sweetalert2';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Rating from '../Elements/Rating';
import React, { useEffect, useState } from 'react';
import { TestimonialData } from '../Elements/TestimonialData';

interface TestimoniEditFormProps {
  onSubmit: (data: TestimonialData) => void;
  onCancel: () => void;
  editingTestimonial: TestimonialData | null;
}

const TestimoniEditForm: React.FC<TestimoniEditFormProps> = ({
  onSubmit,
  onCancel,
  editingTestimonial,
}) => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (editingTestimonial) {
      setComment(editingTestimonial.comment);
      setRating(editingTestimonial.rating);
    }
  }, [editingTestimonial]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Cek apakah form telah terisi dengan baik
    if (!comment || rating === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Anda belum mengisi form',
        showConfirmButton: false,
        timer: 2000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/review/${editingTestimonial?.id}`,
        { comment, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Handle success notification
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Testimoni Anda telah diperbarui.',
          showConfirmButton: false,
          timer: 2000,
        });

        onSubmit(response.data);

        // Reset form setelah submit sukses
        setComment('');
        setRating(0); // Reset rating setelah sukses submit

        // Refresh halaman setelah delay
        setTimeout(() => {
          window.location.reload(); // Ini akan menyegarkan halaman setelah 2 detik
        }, 500); // Delay 500 ms
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
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat mengirim testimoni.',
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className='space-y-6 p-6 border rounded-lg shadow-xl bg-white'
      onSubmit={handleFormSubmit}
    >
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
        <Button variant='add' type='submit' disabled={isLoading}>
          {isLoading ? 'Mengirim...' : 'Kirim'}
        </Button>
      </div>
    </form>
  );
};

export default TestimoniEditForm;

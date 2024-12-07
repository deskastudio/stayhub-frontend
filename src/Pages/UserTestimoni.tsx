import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserProfil from '../components/Fragments/ProfileUser';
import Placeholder from '../components/Fragments/Placeholder';
import TestimoniForm from '../components/Fragments/TestimoniForm';
import TestimoniEditForm from '../components/Fragments/TestimoniEditForm'; // Import the edit form
import TestimonialItem from '../components/Fragments/TestimonialItem';
import { TestimonialData } from '../components/Elements/TestimonialData';
import { getUserId, getRoomId } from '../utils/auth.utils';

const UserTestimoni: React.FC = () => {
  const [step, setStep] = useState<'empty' | 'form' | 'list' | 'edit'>('empty');
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialData | null>(null);
  const pageTitle = 'Testimoni';

  // Get data user
  const token = sessionStorage.getItem('token');
  const id = getUserId();
  const roomId = getRoomId();

  useEffect(() => {
    const fetchUserAndTestimonials = async () => {
      try {
        // Fetch testimonials
        const testimonialsResponse = await axios.get(
          `http://localhost:8000/review/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const testimonialsData = testimonialsResponse.data.data.map(
          (testimonial: any) => ({
            id: testimonial.id,
            roomType: testimonial.room?.type[0]?.name,
            roomNumber: testimonial.room?.name,
            comment: testimonial.comment,
            rating: testimonial.rating,
          })
        );

        setTestimonials(testimonialsData);
        setStep(testimonialsData.length > 0 ? 'list' : 'empty');
      } catch (error) {
        console.error('Error fetching data:', error);
        setStep('empty');
      }
    };

    fetchUserAndTestimonials();
  }, [token, id]);

  const handleFormSubmit = (data: TestimonialData) => {
    // Menambahkan testimonial baru ke dalam state testimonials
    setTestimonials((prev) => [...prev, data]);

    // Update step ke "list" agar daftar testimoni ditampilkan
    setStep('list');
  };

  const handleEditTestimonial = (testimonial: TestimonialData) => {
    setEditingTestimonial(testimonial);
    setStep('edit'); // Show the edit form
  };

  const handleUpdateTestimonial = (updatedTestimonial: TestimonialData) => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === updatedTestimonial.id ? updatedTestimonial : item))
    );
    setEditingTestimonial(null);
    setStep('list'); // Go back to the list view
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/review/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestimonials((prev) => prev.filter((item) => item.id !== id));
      if (testimonials.length - 1 === 0) setStep('empty');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  return (
    <div className='p-8 flex-grow'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>{pageTitle}</h1>
        <UserProfil />
      </div>
      <div>
        {step === 'empty' && (
          <Placeholder
            title='Belum ada testimoni'
            description='Silakan tambahkan testimoni baru.'
            buttonText='Tambah Testimoni'
            onAdd={() => setStep('form')}
          />
        )}
        {step === 'form' && roomId && (
          <TestimoniForm
            userId={id}
            roomId={roomId}
            onSubmit={handleFormSubmit}
            onCancel={() => setStep(testimonials.length ? 'list' : 'empty')}
          />
        )}
        {step === 'edit' && editingTestimonial && (
          <TestimoniEditForm
            onSubmit={handleUpdateTestimonial}
            onCancel={() => {
              setEditingTestimonial(null);
              setStep('list');
            }}
            editingTestimonial={editingTestimonial }
        />
        )}
        {step === 'list' && (
          <div className='space-y-4'>
            {testimonials.map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={() => handleEditTestimonial(testimonial)}
                onDelete={() => handleDeleteTestimonial(testimonial.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTestimoni;
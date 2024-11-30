import React, { useEffect, useState } from 'react';
import UserProfil from '../components/Fragments/ProfileUser';
import Placeholder from '../components/Fragments/Placeholder';
import TestimoniForm from '../components/Fragments/TestimoniForm';
import TestimonialItem from '../components/Fragments/TestimonialItem';
import { TestimonialData } from '../components/Elements/TestimonialData';

// new import axios and use authUtils
import axios from 'axios';
import { getUserId } from '../utils/auth.utils';

const UserTestimoni: React.FC = () => {
  const [step, setStep] = useState<'empty' | 'form' | 'list'>('empty');
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [tempTestimonial, setTempTestimonial] =
    useState<TestimonialData | null>(null);
  const pageTitle = 'Testimoni Saya';

  // NEW get token and idUser
  const token = sessionStorage.getItem('token');
  const id = getUserId();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/review/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data.data) {
          const testimonial = response.data.data;
          setTestimonials([
            {
              id: testimonial[0].id,
              fullName: testimonial[0].user.fullName,
              roomType: testimonial[0].room.type[0].name,
              roomNumber: testimonial[0].room.name,
              comment: testimonial[0].comment,
              rating: testimonial[0].rating,
            },
          ]);
          setStep('list');
        } else {
          setStep('empty');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setStep('empty');
      }
    };

    fetchTestimonials();
  }, [token, id]);

  const handleAddTestimonial = () => {
    setTempTestimonial(null);
    setStep('form');
  };

  const handleFormSubmit = (data: TestimonialData) => {
    if (tempTestimonial) {
      setTestimonials((prev) =>
        prev.map((item) => (item.id === tempTestimonial.id ? data : item))
      );
    } else {
      setTestimonials((prev) => [...prev, data]);
    }
    setTempTestimonial(null);
    setStep('list');
  };

  const handleDeleteTestimonial = (index: number) => {
    setTestimonials((prev) => {
      const updatedTestimonials = prev.filter((_, i) => i !== index);
      if (updatedTestimonials.length === 0) {
        setStep('empty');
      }
      return updatedTestimonials;
    });
  };

  const handleEditTestimonial = (index: number) => {
    const testimonialToEdit = testimonials[index];
    setTempTestimonial(testimonialToEdit);
    setStep('form');
  };

  return (
    <div className='p-8 flex-grow'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>{pageTitle}</h1>
        <UserProfil />
      </div>
      <div>
        {step === 'empty' && testimonials.length === 0 && (
          <Placeholder
            title='Belum ada testimoni'
            description='Silakan tambahkan testimoni baru.'
            buttonText='Tambah Testimoni'
            onAdd={handleAddTestimonial}
          />
        )}

        {step === 'form' && (
          <TestimoniForm
            initialData={tempTestimonial}
            onSubmit={handleFormSubmit}
            onCancel={() => setStep(testimonials.length ? 'list' : 'empty')}
          />
        )}

        {step === 'list' && testimonials.length > 0 && (
          <div className='space-y-4'>
            {testimonials.map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={() =>
                  handleEditTestimonial(testimonials.indexOf(testimonial))
                }
                onDelete={() =>
                  handleDeleteTestimonial(testimonials.indexOf(testimonial))
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTestimoni;

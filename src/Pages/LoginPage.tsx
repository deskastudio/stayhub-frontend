import React from 'react';
import LoginForm from '../components/Fragments/LoginForm';
import ImageCarousel from '../components/Fragments/ImageCarousel';

const LoginPage: React.FC = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='flex h-screen w-full bg-white'>
        <div className='w-2/3'>
          <ImageCarousel />
        </div>
        <div className='w-full flex items-center justify-center'>
          <div className='w-full max-w-md'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

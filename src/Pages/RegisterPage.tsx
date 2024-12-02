import React from 'react';
import AuthLayout from '../components/Layouts/AuthLayout';
import ImageCarousel from '../components/Fragments/ImageCarousel';
import RegisterForm from '../components/Fragments/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex h-screen w-full bg-white">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
        <div className="w-full">
          <ImageCarousel />
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;

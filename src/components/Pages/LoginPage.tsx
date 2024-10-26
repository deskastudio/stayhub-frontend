import React from 'react';
import AuthLayout from '../Layouts/AuthLayout';
import LoginForm from '../Fragments/LoginForm';
import ImageCarousel from '../Fragments/ImageCarousel';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex h-screen w-full bg-white">
        <div className="w-2/3">
          <ImageCarousel />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

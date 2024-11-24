import React from 'react';
import AuthLayout from '../components/Layouts/AuthLayout';
import LoginForm from '../components/Fragments/LoginFormAdmin';
import ImageCarousel from '../components/Fragments/ImageCarousel';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex h-screen w-full bg-white">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
        <div className="w-full">
          <ImageCarousel />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

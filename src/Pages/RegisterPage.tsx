import ImageCarousel from '../components/Fragments/ImageCarousel';
import RegisterForm from '../components/Fragments/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='flex h-screen w-full bg-white'>
        <div className='w-full flex items-center justify-center'>
          <div className='w-full max-w-md'>
            <RegisterForm />
          </div>
        </div>
        <div className='w-full'>
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

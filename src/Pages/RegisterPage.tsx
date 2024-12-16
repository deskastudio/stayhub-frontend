import ImageCarousel from '../components/Fragments/ImageCarousel';
import RegisterForm from '../components/Fragments/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 h-full w-full bg-white'>
        <div className='w-full flex items-center justify-center order-last'>
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

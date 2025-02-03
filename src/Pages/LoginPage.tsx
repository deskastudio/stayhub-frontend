import LoginForm from '../components/Fragments/LoginForm';
import ImageCarousel from '../components/Fragments/ImageCarousel';

const LoginPage: React.FC = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 h-full w-full bg-white'>
        <div>
          <ImageCarousel />
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-full max-w-md px-6'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

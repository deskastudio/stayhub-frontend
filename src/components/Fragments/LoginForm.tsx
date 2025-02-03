import { useEffect } from 'react';
import Button from '../Elements/Button';
import Input from '../Elements/Input';
import ForgotPasswordLink from '../Elements/ForgotPassword';
import useLogin from '../../hooks/useLogin';

const LoginForm: React.FC = () => {
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useLogin();

  useEffect(() => {
    window.history.replaceState({}, document.title, '/login');
  }, []);

  return (
    <form onSubmit={handleLogin} className='space-y-4'>
      <div className='text-center mb-4'>
        <a href='/'>
          <img
            src='/stayhub-logo2.png'
            alt='StayHub Logo'
            className='w-1/2 mx-auto mb-10'
          />
        </a>
      </div>
      <div>
        <Input
          label='Email'
          name='email'
          type='text'
          id='email'
          placeholder='Masukkan Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Input
          label='Password'
          name='password'
          type='password'
          id='password'
          placeholder='Masukkan Kata Sandi'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ForgotPasswordLink />
      <div className='flex flex-col items-center mt-4 gap-3'>
        <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? 'Memuat...' : 'Masuk'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import ForgotPasswordLink from '../Elements/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import { getUserId, getUserRole, getUserName } from '../../utils/auth.utils';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.history.replaceState({}, document.title, '/login');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Post data login
      const response = await axios.post(
        'https://stayhub-api.vercel.app/auth/signin',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;

        // Set token in session storage
        sessionStorage.setItem('token', token);

        // Alert success
        const name = getUserName();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: `Halo ${name}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        // Check if there's a pending booking
        const pendingBooking = localStorage.getItem('_pendingBooking');
        if (pendingBooking) {
          const roomId = JSON.parse(pendingBooking).id;
          const userId = getUserId();

          // Post transaction
          const response = await axios.post(
            `https://stayhub-api.vercel.app/transaction/callback/${roomId}`,
            { userId },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
            }
          );

          // Remove pending booking in local storage
          localStorage.removeItem('_pendingBooking');

          // Check if the response status is 201 (success)
          if (response.status === 201) {
            // Set midtrans in local storage
            localStorage.setItem('midtrans', JSON.stringify(response.data));
            const midtrans = localStorage.getItem('midtrans');

            // Redirect to midtrans
            if (midtrans) {
              const midtransRedirect = JSON.parse(midtrans).data.redirect_url;
              window.location.href = midtransRedirect;
            }
            return;
          }
        } else if (pendingBooking === null) {
          // Redirect based on role
          const { role } = getUserRole();
          if (role === 'admin') {
            navigate('/beranda'); // Admin dashboard
          } else {
            navigate('/user-dashboard'); // User dashboard
          }
        }
      }
    } catch (error) {
      // Error handling for different types of errors
      if (axios.isAxiosError(error) && error.response) {
        // Error response from the server
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: error.response.data.message || 'Invalid email or password.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className='space-y-4'>
      <div className='text-center mb-4'>
        <Image
          src='/stayhub-logo2.png'
          alt='Login Image'
          className='w-1/2 mx-auto mb-10'
        />
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
          {isLoading ? 'Memuat...' : 'Masuk Akun'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

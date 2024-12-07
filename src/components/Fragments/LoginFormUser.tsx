// fragments/LoginForm.tsx
import React, { useState } from 'react';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import ForgotPasswordLink from '../Elements/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserId, getUserRole, getUserName } from '../../utils/auth.utils';
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/auth/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Set token in session storage
        sessionStorage.setItem('token', token);

        // Pop-up berhasil login
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
          const roomId = JSON.parse(pendingBooking).roomId;
          const userId = getUserId();

          const response = await axios.post(
            `http://localhost:8000/transaction/callback/${roomId}`,
            { userId },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
            }
          );

          // Remove pending booking
          localStorage.removeItem('_pendingBooking');

          // Check if the response status is 201
          if (response.status === 201) {
            // Set midtrans in local storage
            localStorage.setItem('midtrans', JSON.stringify(response.data));
            const midtrans = localStorage.getItem('midtrans');

            // Redirect to midtrans
            if (midtrans) {
              const midtransRedirect = JSON.parse(midtrans).data.redirect_url;

              // Redirect to midtrans
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
      console.error(error);
      // Error handling for different types of errors
      if (axios.isAxiosError(error) && error.response) {
        // Jika ada respons error dari server
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: error.response.data.message || 'Invalid email or password.',
        });
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleLogin} className='space-y-4'>
      <div className='text-center mb-4'>
        <Image
          src='/stayhubLogin.png' // Use relative path
          alt='Login Image'
          className='w-1/2 mx-auto mb-10'
        />
      </div>
      <div>
        <Input
          label='Email'
          name='email' // Consistent with label
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

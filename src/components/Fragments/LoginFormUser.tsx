// fragments/LoginForm.tsx
import React, { useState } from 'react';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import ForgotPasswordLink from '../Elements/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserRole, getUserName } from '../../utils/auth.utils';
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state
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
          title: 'Login Successful!',
          text: `Welcome, ${name}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        // Redirect based on role
        const { role } = getUserRole();
        if (role === 'admin') {
          navigate('/beranda'); // Admin dashboard
        } else {
          navigate('/user-dashboard'); // User dashboard
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);

      // Error handling for different types of errors
      if (axios.isAxiosError(error) && error.response) {
        // Jika ada respons error dari server
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: error.response.data.message || 'Invalid email or password.',
        });
      } else {
        // Error jaringan atau error lain
        Swal.fire({
          icon: 'error',
          title: 'Network Error!',
          text: 'Please check your internet connection and try again.',
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

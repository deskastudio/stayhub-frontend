import { useState } from 'react';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk validasi email
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10,15}$/; // Regex untuk validasi nomor telepon
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    const passwordLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);
    return (
      passwordLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email!',
        text: 'Email must be in a valid format.',
      });
      return;
    }

    if (!validatePhone(phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number!',
        text: 'Phone number must be between 10 to 15 digits.',
      });
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password!',
        text: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://stayhub-api.vercel.app/auth/signup',
        {
          fullName,
          email,
          phone,
          address,
          password,
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Registration Success!',
        text: response.data.message,
        confirmButtonText: 'login now',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response?.data?.message || 'An unknown error occurred.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Unexpected Error',
          text: 'An unknown error occurred. Please try again later.',
        });
      }
    }
  };

  return (
    <form onSubmit={handleRegister} method='post' className='space-y-4'>
      <div className='text-center mb-4'>
        <Image
          src='/stayhub-logo2.png'
          alt='Login Image'
          className='w-1/2 mx-auto mb-10'
        />
      </div>
      <h1 className='text-3xl font-bold text-primary text-center'>Register</h1>
      <div>
        <Input
          label='Nama Lengkap'
          name='name'
          type='text'
          id='name'
          placeholder='Masukkan Nama Lengkap'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          label='Phone'
          name='phone'
          type='number'
          id='phone'
          placeholder='Masukkan Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <Input
          label='Alamat'
          name='alamat'
          type='text'
          id='alamat'
          placeholder='Masukkan Alamat'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <Input
          label='Kata Sandi'
          name='password'
          type='password'
          id='password'
          placeholder='Masukkan Kata Sandi'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-col items-center mt-4 gap-3'>
        <Button type='submit' variant='primary'>
          Daftar Akun
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getUserId, getUserRole, getUserName } from '../utils/auth.utils';

const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://stayhub-api.vercel.app/auth/signin',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        sessionStorage.setItem('token', token);

        const name = getUserName();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: `Halo ${name}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        const pendingBooking = localStorage.getItem('_pendingBooking');
        if (pendingBooking) {
          const roomId = JSON.parse(pendingBooking).id;
          const userId = getUserId();

          const transactionResponse = await axios.post(
            `https://stayhub-api.vercel.app/transaction/callback/${roomId}`,
            { userId },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
            }
          );

          localStorage.removeItem('_pendingBooking');

          if (transactionResponse.status === 201) {
            localStorage.setItem(
              'midtrans',
              JSON.stringify(transactionResponse.data)
            );
            const midtransRedirect = JSON.parse(
              localStorage.getItem('midtrans')!
            ).data.redirect_url;
            window.location.href = midtransRedirect;
            return;
          }
        } else {
          const { role } = getUserRole();
          if (role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
  };
};

export default useLogin;

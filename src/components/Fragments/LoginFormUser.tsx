// fragments/LoginForm.tsx
import React, { useState } from 'react';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import Label from '../Elements/Label';
import ForgotPasswordLink from '../Elements/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('http://localhost:8000/auth/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data;

        // Set token and role in session storage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);

        // Redirect based on role
        if (role === 'admin') {
          navigate('/beranda');
        } else {
          navigate('/user-dashboard');
        }

        // Show success message
        setMessage('Login successful!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Error handling for different types of errors
      if (error.response) {
        // Server responded with an error code
        setMessage(`Login failed! ${error.response.data.message || 'Invalid email or password'}`);
      } else {
        // Network or other errors
        setMessage('Login failed! Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="text-center mb-4">
        <Image
          src="/stayhubLogin.png" // Use relative path
          alt="Login Image"
          className="w-1/2 mx-auto mb-10"
        />
      </div>
      <div>
        <Input
          label="Email"
          name="email" // Consistent with label
          type="text"
          id="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Kata Sandi</Label>
        <Input
          label="Password"
          name="password"
          type="password"
          id="password"
          placeholder="Masukkan Kata Sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ForgotPasswordLink />
      <div className="flex flex-col items-center mt-4 gap-3">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Memuat...' : 'Masuk Akun'}
        </Button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </form>
  );
};

export default LoginForm;

// fragments/LoginForm.tsx
import React, { useState } from 'react';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import Label from '../Elements/Label';
import ForgotPasswordLink from '../Elements/ForgotPassword';
import GoogleLoginButton from '../Elements/GoogleLoginButton';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="text-center mb-4">
        <Image src="./public/stayhubLogin.png" alt="Login Image" className="w-1/2 mx-auto mb-10" />
      </div>
      <div>
        <Label htmlFor="username">Email</Label>
        <Input
          type="text"
          id="username"
          placeholder="Masukkan Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Kata Sandi</Label>
        <Input
          type="password"
          id="password"
          placeholder="Masukkan Kata Sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Akhir gabungan LoginFields */}
      <ForgotPasswordLink />
      <div className="flex flex-col items-center mt-4 gap-3">
        <Button type="submit" variant="primary">
          Masuk Akun
        </Button>
        <GoogleLoginButton />
      </div>
    </form>
  );
};

export default LoginForm;

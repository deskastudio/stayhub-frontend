import React, { useState } from 'react';
import Button from '../Elements/Button';
import Image from '../Elements/Image';
import Input from '../Elements/Input';
import axios from 'axios';

const RegisterForm: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

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
        return passwordLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi input
        if (!validateEmail(email)) {
            setMessage('Invalid email!');
            return;
        }

        if (!validatePhone(phone)) {
            setMessage('Invalid phone number! Phone number must contain 10 to 15 digits.');
            return;
        }

        if (!validatePassword(password)) {
            setMessage('Invalid password! Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/signup', {
                fullName,
                email,
                phone,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'An unknown error occurred');
            } else {
                setMessage('An unknown error occurred');
            }
        }

        console.log({fullName, email, phone, password});
        
    };

    

    return (
        <form onSubmit={handleRegister} method='post' className="space-y-4">
            <div className="text-center mb-4">
                <Image src="./public/stayhubLogin.png" alt="Login Image" className="w-1/2 mx-auto mb-10" />
            </div>
            <h1 className="text-3xl font-bold text-primary text-center">Register</h1>
            <div>
                <Input
                    label="Nama Lengkap"
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Masukkan Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div>
                <Input
                    label="Email"
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Masukkan Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <Input
                    label="Phone"
                    name="phone"
                    type="number"
                    id="phone"
                    placeholder="Masukkan Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div>
                <Input
                    label="Kata Sandi"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Masukkan Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex flex-col items-center mt-4 gap-3">
                <Button type="submit" variant="primary">
                    Daftar Akun
                </Button>
                {message && <p>{message}</p>}
            </div>
        </form>
    );
};

export default RegisterForm;